const evconfig = require("./evconfig")

const log = require("./log").child({filename: __filename})

/// Parse structured environment variables to objects
function parseenv(key)
{
  const env = process.env
  let temp = {}
  const root = {}

  Object.keys(env).forEach((envVar) =>
  {
    //log.info(envVar, key)
    if(!envVar.startsWith(key))
      return

    const newVar = envVar.replace(/(\.\d+)(?=\.|$)/g, "\[$1")
    // feeds.1.45.filter.3
    // => feeds[.1[.45.filter[.3
    // .1 => an Array (therefore convert \.(\d+)\. to \[\1\]\. )
    // . => an Object
    const objSegments = newVar.split(".")
    const last = objSegments.length -1
    let current = root
    objSegments.forEach((segment, index) => 
    {
      if(index < last)
      {
        if(segment.substr(-1) === "[")
        {
          segment = segment.slice(0, -1)
          // we have an array rather then an object
          if(!Array.isArray(current[segment]))
          {
            current[segment] = []
          }
          // otherwise we already have an Array
        }
        else 
        {
          if(typeof(current[segment]) !== "object" || current[segment] === null) // note Array is an Object
          {
            current[segment] = {}
          }
          // otherwise we already have an Object
        }
        current = current[segment]
      }
      else
      {
        // last segment
        current[segment] = env[envVar]
      }
    })
  })
  log.info("parseenv", JSON.stringify(root, null, 2))
  return(root)
}

module.exports = parseenv
module.exports.parseenv = parseenv // deprecated