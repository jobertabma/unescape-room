import _ from 'underscore';

import CaseSensitivePhraseFilter from '../filters/CaseSensitivePhrase.js';
import CaseInsensitivePhraseFilter from '../filters/CaseInsensitivePhrase.js';
import StringReverseFilter from '../filters/StringReverse.js';
import CaseSensitiveAlphaFilter from '../filters/CaseSensitiveAlpha.js';
import CaseInsensitiveAlphaFilter from '../filters/CaseInsensitiveAlpha.js';
import CaseSensitiveCharacterFilter from '../filters/CaseSensitiveCharacter.js';
import SpecialCharacterFilter from '../filters/SpecialCharacter.js';
import NumberFilter from '../filters/Number.js';
import EscapeFilter from '../filters/Escape.js';
import LengthFilter from '../filters/Length.js';
import AtobFilter from '../filters/Atob.js';
import WhiteSpaceFilter from '../filters/WhiteSpace.js';

import ShuffleHelper from '../helpers/Shuffle.js';

class Filters {
  static generate(htmlTemplate, functionToBeCalled, valueToBePassed, filters) {
    let tempFilter;
    let generatedFilters = [];
    let availableFilters = _.reject([
      filters > 0 && NumberFilter,
      filters > 1 && WhiteSpaceFilter,
      filters > 2 && CaseSensitivePhraseFilter,
      filters > 3 && CaseSensitiveAlphaFilter,
      filters > 4 && SpecialCharacterFilter,
      filters > 4 && EscapeFilter,
      filters > 5 && CaseInsensitiveAlphaFilter,
      filters > 5 && CaseInsensitivePhraseFilter,
      filters > 5 && AtobFilter,
      filters > 5 && StringReverseFilter,
      filters > 5 && LengthFilter
    ], item => item === false);

    // take characters after payload and make sure to ignore them
    const templatePayloadRemainder = htmlTemplate.match(
      new RegExp(/{payload}(?<remainder>.*?$)/m)
    );

    let allowedCharacters = '';

    if(templatePayloadRemainder) {
      allowedCharacters = templatePayloadRemainder[1];
    }

    // after level 1, always strip at least one character from the value or function
    if(filters >= 1) {
      while(tempFilter === undefined) {
        let valueToBeProcessed = _.random(0, 1) === 0 ? functionToBeCalled : valueToBePassed;

        let possibleFilter = new CaseSensitiveCharacterFilter(
          valueToBeProcessed[_.random(0, valueToBeProcessed.length - 1)]
        );

        if(possibleFilter.isValidCombination(generatedFilters, allowedCharacters)) {
          tempFilter = possibleFilter;
        }
      }

      generatedFilters.push(tempFilter);
    }

    while(generatedFilters.length < filters) {
      let newFilter = availableFilters[_.random(0, availableFilters.length - 1)];

      tempFilter = newFilter.generate(filters);

      if (tempFilter.isValidCombination(generatedFilters, allowedCharacters)) {
        generatedFilters.push(tempFilter);
      }
    }

    return ShuffleHelper.shuffle(generatedFilters);
  }
}

export default Filters;
