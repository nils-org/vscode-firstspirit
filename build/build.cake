#tool nuget:?package=NUnit.ConsoleRunner&version=3.4.0
#addin Cake.Yarn
#addin Cake.VsCode
#addin nuget:?package=Newtonsoft.Json&version=10.0.3
#addin nuget:?package=Cake.Json
#addin nuget:?package=Cake.Git

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories.
var rootDir = Directory("./../");
var srcDir = rootDir + Directory ("src");
var binDir = rootDir + Directory("bin");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
{
    CleanDirectory(binDir);
});

Task("Ensure tools")
    .Does(() =>
{
    // HOW ?!?!
});

Task("Build")
	
    .DoesForEach(new []{
		"fs-lang"
	}, (f) =>
{
	var folder = srcDir + Directory(f);
	EnsureDirectoryExists(binDir);
	
	Yarn.FromPath(folder).Install();
	
	// version
	var packJson = ParseJsonFromFile(folder + File("package.json"));
	var version = packJson["version"];
	
	VscePackage(new VscePackageSettings()
	{
		WorkingDirectory = folder,
		OutputFilePath = binDir + File($"{f}-{version}.vsix")
	});
	
	// update Build.BuildNumber to reflect the current version
	Information($"##vso[task.setvariable variable=FS_PACKAGEVERSION]{version}");
	var buildNum = EnvironmentVariable("BUILD_BUILDNUMBER") ?? DateTime.Now.ToString("yyyyMMddHHmmss");
	Information($"##vso[build.updatebuildnumber]{version}-{buildNum}");
	
	// check for tag-conflict..
	var tagExists = "0";
	var tags = GitTags(rootDir);
	foreach(var t in tags) {
		if(t.ToString().EndsWith(version.ToString())){
			tagExists = "1";
			break;
		}
	}
	Information($"##vso[task.setvariable variable=FS_TAGCONFLICT]{tagExists}");
});

Task("Run-Unit-Tests")
    .IsDependentOn("Build")
    .DoesForEach(new string[]{}, (f) =>
{
   // run tests?
});

//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
	.IsDependentOn("Clean")
    .IsDependentOn("Build");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);