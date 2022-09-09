import { getShareButtons } from '../../scripts/blog.js';

export default async function decorate(block) {
  const share = document.createElement('p');
  share.innerHTML = `<p><span>Share this story on </span><span>${getShareButtons()}</span></p>`;
  block.append(share);
}
