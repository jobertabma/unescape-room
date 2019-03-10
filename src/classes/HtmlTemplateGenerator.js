import _ from 'underscore';

import TemplateOne from './html_templates/1.html.js'

class HtmlTemplateGenerator {
  static generate() {
    const templates = [
      TemplateOne,
    ];

    var randomIndex = _.random(0, templates.length - 1);

    return templates[randomIndex];
  }
}

export default HtmlTemplateGenerator;
