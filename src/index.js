import Module from "module";
import path from "path";

let {
    npm_package_config_ignore_ext = ""
} = process.env,
    ref = npm_package_config_ignore_ext.split(",");
    
function loadFile (module, filename){
    return module._compile("", filename);
}

function findExtension (filename){
    let extensions = path.basename(filename).split(".");
    if (extensions[0] === ""){
        extensions.shift();
    }
    while (extensions.shift()){
        let ext = "." + extensions.join(".");
        if (Module._extensions[ext] || ref.filter(r => r === ext).length){
            return ext;
        }
    }
    return ".js";
}

if (require.extensions){
    ref.forEach((ext)=>{
        require.extensions[ext] = loadFile;
    });

    Module.prototype.load = function(filename){
        let ext = findExtension(filename);
        Object.assign(this, {
            filename,
            paths: Module._nodeModulePaths(path.dirname(filename))
        });
        Module._extensions[ext](this, filename);
        return this.loaded = true;
    };
}
