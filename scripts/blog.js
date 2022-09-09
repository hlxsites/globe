import { buildBlock, getMetadata, toClassName } from './scripts.js';

export async function lookupPages(pathnames, collection) {
  const indexPath = '/about-us/newsroom/query-index.json';
  window.pageIndex = window.pageIndex || {};
  if (!window.pageIndex[collection]) {
    const resp = await fetch(indexPath);
    const json = await resp.json();
    const lookup = {};
    json.data.forEach((row) => {
      lookup[row.path] = row;
    });
    window.pageIndex[collection] = { data: json.data, lookup };
  }

  /* guard for legacy URLs */
  pathnames.forEach((path, i) => {
    if (path.endsWith('/')) pathnames[i] = path.substr(0, path.length - 1);
  });
  const { lookup } = window.pageIndex[collection];
  const result = pathnames.map((path) => lookup[path]).filter((e) => e);
  return (result);
}

export function formatDate(dateString) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const [year, month, day] = dateString.split('-').map((n) => +n);
  return `${months[month - 1]} ${day}, ${year}`;
}

export function toCategory(category) {
  let categoryName = toClassName(category);
  while (categoryName.includes('--')) categoryName = categoryName.replace('--', '-');
  return categoryName;
}

export function getShareButtons() {
  return `
    <span class="share-buttons">
      <a role="button" tabindex="0" class="share-email" style="background-color: rgb(132, 132, 132); border-radius: 2px;">
        <span style="display: none">Share to Email</span>
        <span class="share-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-email-4" class="at-icon at-icon-email" style="fill: rgb(255, 255, 255); width: 20px; height: 20px;"><title id="at-svg-email-4">Email</title><g><g fill-rule="evenodd"></g><path d="M27 22.757c0 1.24-.988 2.243-2.19 2.243H7.19C5.98 25 5 23.994 5 22.757V13.67c0-.556.39-.773.855-.496l8.78 5.238c.782.467 1.95.467 2.73 0l8.78-5.238c.472-.28.855-.063.855.495v9.087z"></path><path d="M27 9.243C27 8.006 26.02 7 24.81 7H7.19C5.988 7 5 8.004 5 9.243v.465c0 .554.385 1.232.857 1.514l9.61 5.733c.267.16.8.16 1.067 0l9.61-5.733c.473-.283.856-.96.856-1.514v-.465z"></path></g></svg>
        </span>
        <span class="share-button-label" style="font-size: 10.5px; line-height: 20px; height: 20px; color: rgb(255, 255, 255);">Email</span>
      </a>
      <a role="button" tabindex="0" class="share-viber" style="background-color: rgb(123, 81, 157); border-radius: 2px;">
        <span style="display: none">Share to Viber</span>
        <span class="share-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-viber-3" class="at-icon at-icon-viber" style="fill: rgb(255, 255, 255); width: 20px; height: 20px;"><title id="at-svg-viber-3">Viber</title><g><path d="M21.176 27c-.208-.062-.618-.13-.987-.303-6.476-3.02-11.18-7.972-13.853-15.082-.897-2.383.04-4.396 2.298-5.22.405-.147.802-.157 1.2.002.964.383 3.404 4.022 3.458 5.11.042.835-.48 1.287-1 1.67-.983.722-.988 1.638-.568 2.66.948 2.308 2.567 3.895 4.663 4.925.76.374 1.488.337 2.007-.515.925-1.518 2.06-1.445 3.3-.502.62.473 1.253.936 1.844 1.45.8.702 1.816 1.285 1.336 2.754-.5 1.527-2.226 3.066-3.7 3.05zm-4.76-20.986c4.546.166 8.46 4.677 8.406 9.543-.005.478.153 1.185-.504 1.172-.628-.015-.464-.733-.52-1.21-.603-5.167-2.786-7.606-7.52-8.394-.392-.066-.99.026-.96-.535.044-.833.754-.523 1.097-.576zm6.072 8.672c-.045.356.147.968-.385 1.056-.72.118-.58-.595-.65-1.053-.48-3.144-1.5-4.297-4.423-5.005-.43-.105-1.1-.032-.99-.75.108-.685.71-.452 1.164-.393 2.92.38 5.307 3.126 5.284 6.144zm-2.222-.573c.013.398-.026.818-.46.874-.314.04-.52-.245-.553-.597-.12-1.296-.75-2.062-1.95-2.27-.36-.063-.712-.19-.544-.715.11-.352.408-.387.712-.396 1.297-.036 2.815 1.647 2.794 3.103z" fill-rule="evenodd"></path></g></svg>
        </span>
        <span class="share-button-label" style="font-size: 10.5px; line-height: 20px; height: 20px; color: rgb(255, 255, 255);">Viber</span>
      </a>
      <a role="button" tabindex="0" class="share-twitter" style="background-color: rgb(29, 161, 242); border-radius: 2px;">
        <span style="display: none">Share to Twitter</span>
        <span class="share-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-twitter-2" class="at-icon at-icon-twitter" style="fill: rgb(255, 255, 255); width: 20px; height: 20px;"><title id="at-svg-twitter-2">Twitter</title><g><path d="M27.996 10.116c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496 9.037 9.037 0 0 1-2.866 1.095 4.513 4.513 0 0 0-7.69 4.116 12.81 12.81 0 0 1-9.3-4.715 4.49 4.49 0 0 0-.612 2.27 4.51 4.51 0 0 0 2.008 3.755 4.495 4.495 0 0 1-2.044-.564v.057a4.515 4.515 0 0 0 3.62 4.425 4.52 4.52 0 0 1-2.04.077 4.517 4.517 0 0 0 4.217 3.134 9.055 9.055 0 0 1-5.604 1.93A9.18 9.18 0 0 1 6 23.85a12.773 12.773 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336" fill-rule="evenodd"></path></g></svg>
        </span>
        <span class="share-button-label" style="font-size: 10.5px; line-height: 20px; height: 20px; color: rgb(255, 255, 255);">Twitter</span>
      </a>
      <a role="button" tabindex="0" class="share-facebook" style="background-color: rgb(59, 89, 152); border-radius: 2px;">
        <span style="display: none">Share to Facebook</span>
        <span class="share-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-facebook-1" class="at-icon at-icon-facebook" style="fill: rgb(255, 255, 255); width: 20px; height: 20px;"><title id="at-svg-facebook-1">Facebook</title><g><path d="M22 5.16c-.406-.054-1.806-.16-3.43-.16-3.4 0-5.733 1.825-5.733 5.17v2.882H9v3.913h3.837V27h4.604V16.965h3.823l.587-3.913h-4.41v-2.5c0-1.123.347-1.903 2.198-1.903H22V5.16z" fill-rule="evenodd"></path></g></svg>
        </span>
        <span class="share-button-label" style="font-size: 10.5px; line-height: 20px; height: 20px; color: rgb(255, 255, 255);">Facebook</span>
      </a>  
    </span>`;
} 

function buildArticleHeader(main) {
  try {
    const publicationDate = getMetadata('publication-date');
    const tags = getMetadata('article:tag') || '';
    const h1 = document.querySelector('h1');
    const picture = document.querySelector('h1 + p > picture');
    if (publicationDate) {
      document.body.classList.add('blog-post');
      const section = document.createElement('div');
      section.append(buildBlock('article-header', [
        [picture],
        ['NEWSROOM'],
        [h1],
        [`<p><span>${tags}</span></p><p><span>${formatDate(publicationDate)}</span></p>`],
        [`<p><span>Share this story on </span><span>${getShareButtons()}</span></p>`],
      ]));
      main.prepend(section);
      return (true);
    }
  } catch (e) {
    // something went wrong
  }
  return (false);
}

function buildAuthorContainer(main) {
  try {
    if (window.location.pathname.includes('/author/')) {
      document.body.classList.add('author-page');
      const container = buildBlock('author-container', []);
      main.prepend(container);
      return true;
    }
  } catch (e) {
    // something went wrong
  }
  return false;
}

export default async function decorateTemplate(main) {
  const isBlog = buildArticleHeader(main);
  if (isBlog) {
    // buildImageBlocks(main);
    const related = main.querySelector('.related-posts');
    if (related) related.parentElement.insertBefore(buildBlock('author', [['']]), related);
    if (related && !related.nextElementSibling && !related.parentElement.nextElementSibling) {
      const section = document.createElement('div');
      section.append(related);
      main.append(section);
    }
  }
  const isAuthor = buildAuthorContainer(main);
  if (isAuthor) {
    const h1 = document.querySelector('h1');
    const position = h1.nextElementSibling;
    position.remove();
    const pic = document.querySelector('picture')
      ? document.querySelector('picture').parentElement : null;
    let bio;
    if (pic) {
      bio = pic.nextElementSibling;
      pic.remove();
    }
    const body = bio ? [[h1], [bio]] : [[h1]];
    document.querySelector('.author-container').append(
      buildBlock('author-header', body),
      // buildBlock('featured-articles', 'oy'),
      buildBlock('article-feed', [
        ['author', h1.textContent],
      ]),
    );
  }
}
