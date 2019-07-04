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
	
    // write version info-json that a release-pipeline can read. 
	// check for tag-conflict..
	var tagExists = false;
	var tags = GitTags(rootDir);
	foreach(var t in tags) {
		if(t.ToString().EndsWith(version.ToString())){
			tagExists = true;
			break;
		}
	}
	SerializeJsonToFile(binDir + File($"version.json"), new{
		Version = version,
		TagConflict = tagExists
	});
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