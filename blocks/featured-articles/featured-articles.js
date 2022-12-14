import { createOptimizedPicture } from '../../scripts/scripts.js';
import { lookupPages, toCategory } from '../../scripts/blog.js';

function formatDate(date) {
  const d = new Date(Math.round((+date - (1 + 25567 + 1)) * 86400 * 1000));
  d.setMonth(d.getMonth());
  const monthName = d.toLocaleString('default', { month: 'short' });
  const suffix = d.getHours() >= 12 ? 'PM' : 'AM';
  const hours = (((d.getHours() + 11) % 12) + 1);
  const dateNew = `${monthName} ${d.getDate()}, ${d.getFullYear()} | ${hours}:${d.getMinutes()} ${suffix}`;
  return dateNew;
}

export function createBlogCard(article, classPrefix, eager = false) {
  const title = article.title.split(' - ')[0];
  const card = document.createElement('div');
  card.className = `${classPrefix}-card`;
  const image = article.cardImage || article.image;
  const pictureString = createOptimizedPicture(
    image,
    article.imageAlt,
    eager,
    [{ width: 750 }],
  ).outerHTML;
  const mainTag = JSON.parse(article.tags)[0];
  const category = toCategory(mainTag);
  const categoryHref = article.noCategoryLink ? '#' : `href="/blog/category/${category}"`;
  card.innerHTML = `<div class="${classPrefix}-card-header category-color-${category}">
    <span class="${classPrefix}-card-category"><a ${categoryHref}>${mainTag}</a></span> 
    <span class="${classPrefix}-card-readtime">${article.readTime || ''}</span>
    </div>
    <div class="${classPrefix}-card-picture"><a href="${article.path}">${pictureString}</a></div>
    <div class="${classPrefix}-card-body">
    <h3>${title}</h3>
    <p>${article.description}</p>
    <p>${formatDate(article['publication-date'])}</p>
    </div>`;
  return (card);
}

export default async function decorate(block) {
  // cleanup eager image
  const eager = block.querySelector('img[loading="eager"]');
  if (eager) eager.setAttribute('loading', 'lazy');

  const rows = [...block.children];
  const contents = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const [content, category] = [...row.children].map((e, j) => (j ? e.textContent : e));
    if (content.textContent.includes('://')) {
      // handle straight link
      const { pathname } = new URL(content.querySelector('a').href);
      // eslint-disable-next-line no-await-in-loop
      const articles = await lookupPages([pathname], 'blog');
      if (articles.length) {
        const [article] = articles;
        if (i === 0) document.body.classList.add(`category-${toCategory(article.category)}`);
        if (category) {
          article.noCategoryLink = true;
          article.category = category;
        }
        const card = createBlogCard(article, 'featured-articles', i === 0);
        contents.push(card.outerHTML);
      }
    } else {
      contents.push(`<div class="featured-articles-card">${content.outerHTML}</div>`);
    }
  }

  // pad array with empty strings
  for (let i = contents.length; i < 10; i += 1) {
    contents[i] = '';
  }

  const html = `
    <div class="featured-articles-row featured-articles-hero">${contents[0]}</div>
    <div class="featured-articles-row">
      <div class="featured-articles-col">${contents[1]}${contents[2]}</div>
      <div class="featured-articles-col">${contents[3]}${contents[4]}</div>
    </div>
    <div class="featured-articles-row">
    <div class="featured-articles-col">${contents[5]}${contents[6]}${contents[8]}${contents[9]}</div>
    <div class="featured-articles-col featured-articles-large">${contents[7]}</div>
    `;
  block.innerHTML = html;
}
