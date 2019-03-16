import _ from 'underscore';

import CaseSensitivePhraseFilter from '../filters/CaseSensitivePhrase.js';
import StringReverseFilter from '../filters/StringReverse.js';
import CaseSensitiveAlphaFilter from '../filters/CaseSensitiveAlpha.js';
import CaseSensitiveCharacterFilter from '../filters/CaseSensitiveCharacter.js';
import SpecialCharacterFilter from '../filters/SpecialCharacter.js';
import NumberFilter from '../filters/Number.js';
import EscapeFilter from '../filters/Escape.js';
import LengthFilter from '../filters/Length.js';
import AtobFilter from '../filters/Atob.js';

class Filters {
  static generate(htmlTemplate, filters) {
    let generatedFilters = [];

    // take characters after payload and make sure to ignore them
    const templatePayloadRemainder = htmlTemplate.match(
      new RegExp(/{payload}(?<remainder>.*?$)/m)
    );

    let ignoreCharacters = '';

    if(templatePayloadRemainder) {
      ignoreCharacters = templatePayloadRemainder[1];
    }

    while(generatedFilters.length < filters) {
      generatedFilters.push(CaseSensitiveAlphaFilter.generate());
    }

    return generatedFilters;

    //
    // switch(level) {
    // case 'trivial':
    //   if(_.random(0, 9) < 1) {
    //     // 10% chance that string is reversed
    //     filters.push(StringReverseFilter.generate(level));
    //   }
    //
    //   return filters;
    // case 'easy':
    //   if(_.random(0, 9) < 1) {
    //     // 10% chance that string is reversed
    //     filters.push(StringReverseFilter.generate(level));
    //   }
    //
    //   // strip at least one character from function or value
    //   var newFilter;
    //   let possibleFilter;
    //
    //   // make sure random filter does not collide with line trail
    //   while(newFilter === undefined) {
    //     let valueToBeProcessed = _.random(0, 1) === 0 ? functionToBeCalled : valueToBePassed;
    //
    //     possibleFilter = new CaseSensitiveCharacterFilter(
    //       valueToBeProcessed[_.random(0, valueToBeProcessed.length - 1)]
    //     );
    //
    //     if(possibleFilter.process(ignoreCharacters) === ignoreCharacters) {
    //       newFilter = possibleFilter;
    //     }
    //   }
    //
    //   filters.push(newFilter);
    //
    //   // guarantee number of filters
    //   while(filters.length < 3) {
    //     // of the remaining filters, either filter alpha or numeric value
    //     if(_.random(0, 1) < 1) {
    //       filters.push(CaseSensitiveAlphaFilter.generate(level));
    //     } else {
    //       filters.push(NumberFilter.generate(level));
    //     }
    //   }
    //
    //   // the order matters, so let's shuffle it
    //   return filters;
    // case 'medium':
    //   // if(_.random(0, 9) < 1) {
    //     // 10% chance that (some) quotes will be escaped
    //     // filters.push(EscapeFilter.generate(level));
    //   // }
    //
    //   // 50% chance that there's a length filter
    //   if(_.random(0, 1) === 0) {
    //     filters.push(LengthFilter.generate(level));
    //   }
    //
    //   if(_.random(0, 9) < 1) {
    //     filters.push(AtobFilter.generate());
    //   }
    //
    //   filters.push(CaseSensitivePhraseFilter.generate(level));
    //   // filters.push(EscapeQuotesFilter.generate(level));
    //
    //   // guarantee number of filters
    //   while(filters.length < 10) {
    //     // of the remaining filters, either filter alpha or numeric value
    //     if(_.random(0, 1) < 1) {
    //       filters.push(CaseSensitiveAlphaFilter.generate(level));
    //     } else {
    //       filters.push(NumberFilter.generate(level));
    //     }
    //   }
    //
    //   return filters;
    // case 'hard':
    //   return [
    //     EscapeQuotesFilter.generate(level),
    //   ];
    // default:
    //   return [];
    // }
  }
}

export default Filters;
