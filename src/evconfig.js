const process = require("process")

const log = {info: console.log}//() => {}}

/// Parse structured environment variables to arrays (objects)
function evconfig(envObj)
{
  const env = envObj || process.env
  const root = []

  Object.keys(env).forEach((envVar) =>
  {
    //if(!envVar.startsWith(String(key)))
    //  return

    //const newVar = envVar.replace(/(\.\d+)(?=\.|$)/g, "\[$1")
    // feeds.1.45.filter.3
    // => feeds[.1[.45.filter[.3
    // .1 => an Array (therefore convert \.(\d+)\. to \[\1\]\. )
    // . => an Object
    const objSegments = envVar.split(".")
    const leaf = objSegments.length -1
    let current = root
    objSegments.forEach((segment, index) => 
    {
      if(index < leaf)
      {
        if(typeof(current[segment]) !== "object" || current[segment] === null) // note Array is an Object
        {
          current[segment] = []
        }
        // otherwise we already have an Object
        current = current[segment]
      }
      else
      {
        // last (leaf) segment
        current[segment] = env[envVar]
        //console.log("parseenv", segment, JSON.stringify(root, null, 2))
}
    })
  })
  //console.log("parseenv", JSON.stringify(root, null, 2))
  return(root)
}

module.exports = evconfig
module.exports.evconfig = evconfig
module.exports.parseenv = evconfig // deprecated