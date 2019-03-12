import _ from 'underscore';

import TemplateBodyTag from '../templates/html/body.html.js'
import TemplateBodyTagSingle from '../templates/html/body_single.html.js';
import TemplateScriptContents from '../templates/html/javascript.html.js';
import TemplateStyleContents from '../templates/html/css.html.js';
import TemplateInputTagSingle from '../templates/html/input_single.html.js';
import TemplateLinkTag from '../templates/html/link.html.js';
import TemplateImgTag from '../templates/html/img.html.js';
import TemplateImgTagSingle from '../templates/html/img_single.html.js';
import TemplateJsonContentValue from '../templates/html/json_value.html.js';
import TemplateJsonContentKey from '../templates/html/json_key.html.js';

class HtmlTemplate {
  static generate(level) {
    let templates;

    switch(level) {
    case 'trivial':
      templates = [
        TemplateBodyTag,
        TemplateScriptContents,
        TemplateStyleContents,
        TemplateInputTagSingle,
        TemplateLinkTag,
        TemplateImgTag,
        TemplateJsonContentValue
      ];
      break;
    case 'easy':
      templates = [
        TemplateBodyTagSingle,
        TemplateInputTagSingle,
        TemplateImgTagSingle,
      ];
      break;
    case 'medium':
      templates = [
        TemplateBodyTag,
        TemplateBodyTagSingle,
        TemplateInputTagSingle,
        TemplateImgTagSingle,
        TemplateJsonContentKey,
        TemplateJsonContentValue,
      ];
      break;
    case 'hard':
      templates = [
        TemplateBodyTag,
      ];
      break;
    }

    var randomIndex = _.random(0, templates.length - 1);

    return templates[randomIndex];
  }
}

export default HtmlTemplate;
