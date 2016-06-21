/* toki pona rendering engine by Olaf Janssen <nullelement.org> and Quint
 * Guvernator <quint.guvernator.net>. First appeared as "Living Toki Pona using
 * FlexBox layout and Sitelen Sitelen" on nullelement.org */

function addSvgContent(container, url, callback) {
  var fragment = document.createElement('div');
  fragment.style.backgroundImage = 'url(' + url + ')';
  container.appendChild(fragment);
  callback(fragment);
}

function renderSyllable(container, syllable) {
  addSvgContent(container, 'http://smoishele.com/gists/livingtokipona/images/syllables/' + syllable + '.svg', function(fragment) {
    fragment.classList.add('toki-syllable');
    fragment.setAttribute('data-toki', syllable);
  });
}

function renderForeign(container, syllables) {
  var cartouche = document.createElement('div');
  cartouche.classList.add('toki-cartouche');

  syllables.forEach(function (d) {
    if ('string' === typeof d) {
      renderSyllable(cartouche, d);
    }
  });

  var rows = Math.ceil(Math.sqrt(syllables.length));
  cartouche.classList.add(rows < Math.sqrt(syllables.length) ? 'toki-cartouche-row' : 'toki-cartouche-column');
  cartouche.style.height = (rows * (5 - 1.75)) + 'em';

  container.appendChild(cartouche);
  cartouche.style.width = cartouche.scrollWidth + 'px';
}

function renderGlyph(container, glyph, direction) {
  addSvgContent(container, 'http://smoishele.com/gists/livingtokipona/images/toki-dict-' + glyph + '.svg', function (g) {
    g.classList.add('toki-glyph');
    g.setAttribute('data-toki', glyph);
    if (glyph === 'sina' && container.classList.contains('toki-block-row')) {
      g.classList.add('toki-double-width');
    }
  });
}

function renderPunctuation(container, glyph) {
  container.classList.add('toki-pedestal');
  container.classList.add('toki-pedestal-' + glyph);
}

function renderStack(container, glyphs, direction, format) {
  var stack = document.createElement('div');
  stack.classList.add('toki-block');
  stack.classList.add('toki-sentence');
  stack.classList.add('toki-block-' + direction);
  if (glyphs.length > 1 && direction == 'row') {
    stack.classList.add('toki-double-width');
  }
  if (format) {
    stack.classList.add('toki-sentence-' + format);
  }

  renderElements(stack, glyphs);

  container.appendChild(stack);
}

function renderClear(container, glyphs) {
  var stack = document.createElement('div');
  stack.classList.add('toki-clear');
  container.appendChild(stack);
  renderElements(stack, glyphs);
  stack.style.height = stack.offsetHeight + 'px';
  stack.style.width = stack.offsetWidth + 'px';
}

function renderBox(container, glyphs, box, direction) {
  var li = document.createElement('div');
  li.classList.add('toki-stack');
  li.classList.add('toki-stack-' + box);
  li.classList.add('toki-stack-' + direction);
  if (glyphs.length > 1 && direction == 'row') {
    li.classList.add('toki-double-width');
  }
  renderElements(li, glyphs);
  container.appendChild(li);
}

function renderElements(container, elements) {
  elements.forEach(function (d) {
    if ('string' === typeof d) {
      renderGlyph(container, d);
    } else {
      if (d.container) {
        switch (d.container) {
          case 'sentence':
            renderStack(container, d.glyphs);
          case 'foreign':
            renderForeign(container, d.glyphs);
            break;
          case 'stack':
            renderStack(container, d.glyphs, d.direction, d.format);
            break;
          case 'li':
            renderBox(container, d.glyphs, 'li', d.direction);
            break;
          case 'e':
            renderBox(container, d.glyphs, 'e', d.direction);
            break;
          case 'cartouche':
            renderBox(container, d.glyphs, 'cartouche', d.direction);
            break;
          default:
        }
      }
      if (d.punctuation) {
        renderPunctuation(container, d.punctuation);
      }
    }
  });
}

function remove_commas(text) {
  return text.replace(/,/g, '');
}

function Container(type, glyphs) {
  if ('undefined' == typeof type) {
    type = 'stack';
  }
  if ('undefined' == typeof glyphs) {
    glyphs = [];
  }
  return {container: type, glyphs: glyphs}
}

function Punctuation(char) {
  return {punctuation: {'.': 'period', '!': 'exclamation'}[char]}
}

function containerize(text) {
  // TODO: la, ?, :, prepositions
  var words = _.map(text.trim().split(/\b ?/), function (x) { return x.trim(); });
  var new_sentence = false;
  var this_sentence = Container();
  var stack = [this_sentence];

  // new words go to the glyph array of the latest container
  var new_words = this_sentence.glyphs;

  words.forEach(function (word) {

    // handle new sentences
    if (new_sentence) {
      new_sentence = false;
      this_sentence = Container();
      new_words = this_sentence.glyphs;
      stack.push(this_sentence);
    }

    // if the 'word' is punctuation, add it at the top level
    if (_.contains('.!', word)) {
      this_sentence.glyphs.push(Punctuation(word));
      new_sentence = true;

    // otherwise, either add a new container within the current sentence
    } else if (_.contains(['li', 'e'], word)) {
      var c = Container(word);
      this_sentence.glyphs.push(c);
      new_words = c.glyphs;

    // or put the word at the end of the last container
    } else {
      new_words.push(word);
    }
  });
  return stack;
}

function render_toki(container, text) {
  renderElements(container, containerize(remove_commas(text)));
}

/* UNUSED */

function forceRedraw(element){
  var display = element.style.display;
  element.style.display = 'none';
  element.offsetHeight;
  element.style.display = display;
}
