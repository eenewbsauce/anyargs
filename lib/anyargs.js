'use strict';

module.exports = {
  parse: parse
};

function parse(args, metadata) {
  if (!validInput(args, metadata)) {
    throw new Error('helper::arguments::decipherArguments:: missing args or metadata parameter. Possible duplicated type in arguments');
  }

  if (requiredParamsNotSupplied(args, metadata)) {
    throw new Error('helper::arguments::decipherArguments:: missing required parameter in args');
  }

  let output = alignArgsWithMetadata(args, metadata);

  if (validOutput(output, metadata)) {
    return output;
  }

  throw new Error('helper::arguments::decipherArguments:: malformed output, possible duplication of single parameter');
}
//private
function alignArgsWithMetadata(args, metadata) {
  let output = {};

  Object.keys(metadata).forEach(key => {
    let type = metadata[key].type;

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === type) {
        output[key] = args[i]
        continue;
      } else if (!output.hasOwnProperty(key)) {
        output[key] = metadata[key].defaultValue;
      }
    };
  });

  return output;
}

function validInput(args, metadata) {
  let previousType;
  let duplicateTypesInMetadata = false;
  let argsExists = typeof args !== 'undefined';
  let metadataExists = typeof metadata !== 'undefined';

  if (metadataExists) {
    Object.keys(metadata).forEach((key, i) => {
      if (i == 0) {
        previousType = metadata[key].type;
      } else if(!duplicateTypesInMetadata) {
        duplicateTypesInMetadata = metadata[key].type === previousType;
      }
    });
  }

  return argsExists
    && metadataExists
    && !duplicateTypesInMetadata
}

function requiredParamsNotSupplied(args, metadata) {
  let notSupplied = true;

  Object.keys(metadata).every(key => {
    if (metadata[key].required) {
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === metadata[key].type) {
          notSupplied = false;
          continue;
        }
      };
    } else {
      notSupplied = false;
    }
  });

  return notSupplied;
}

function validOutput(output, metadata) {
  return Object.keys(metadata)
    .every(key => {
      return typeof output[key] !== 'undefined' &&
        typeof output[key] === metadata[key].type;
      }) ||
    Object.keys(metadata)
      .filter(key => {
        return metadata[key].required;
      })
      .every(key => {
        return typeof output[key] !== 'undefined' &&
          typeof output[key] === metadata[key].type;
      });
}
