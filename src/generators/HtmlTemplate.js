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
  static generate(filters) {
    let templates;

    if (filters >= 0 && filters <= 1) {
      templates = [
        TemplateBodyTag,
        TemplateBodyTagSingle
      ];
    } else if (filters >= 2 && filters <= 4) {
      templates = [
        TemplateBodyTag,
        TemplateBodyTagSingle,
        TemplateImgTag,
        TemplateImgTagSingle,
        TemplateLinkTag
      ];
    } else if (filters >= 5 && filters <= 7) {
      templates = [
        TemplateBodyTag,
        TemplateBodyTagSingle,
        TemplateScriptContents,
        TemplateStyleContents,
        TemplateInputTagSingle,
        TemplateLinkTag,
        TemplateImgTag,
        TemplateImgTagSingle,
        TemplateJsonContentValue,
        TemplateJsonContentKey,
      ];
    } else {
      templates = [
        TemplateScriptContents,
        TemplateStyleContents,
        TemplateImgTagSingle,
        TemplateJsonContentValue,
        TemplateJsonContentKey,
      ];
    }

    var randomIndex = _.random(0, templates.length - 1);

    return templates[randomIndex];
  }
}

export default HtmlTemplate;
