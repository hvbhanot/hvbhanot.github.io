import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseProfile,
  parseDownloads,
  parseBadge,
} from '../scripts/refresh-stats.mjs';

const profile =
  'pageUser:{username:"hvbhanot",totalContributions:16,totalPoints:41,contributionsPercentile:.72488},username:"hvbhanot"';
const badge = `<svg aria-label="hvbhanot's TensorTonic stats"><text>153</text><text>PROBLEMS SOLVED</text><text>98 Easy</text><text>47 Medium</text><text>8 Hard</text></svg>`;

test('reads public profile fields and normalizes fractional percentiles', () => {
  assert.deepEqual(parseProfile(profile), {
    contributions: 16,
    points: 41,
    contributionPercentile: 0.725,
  });
});
test('rejects the wrong profile and missing or impossible statistics', () => {
  assert.throws(() =>
    parseProfile(profile.replaceAll('hvbhanot', 'another-user')),
  );
  assert.throws(() => parseProfile(profile.replace('totalPoints:41,', '')));
  assert.throws(() => parseProfile(profile.replace('.72488', '101')));
  assert.throws(() => parseDownloads('downloads:-3,views:1'));
  assert.throws(() => parseDownloads('downloads:2.5,views:1'));
  assert.throws(() => parseDownloads('downloads:9oops,views:1'));
});
test('accepts zero downloads, and refuses to substitute views for downloads', () => {
  assert.equal(parseDownloads('downloads:0,views:700'), 0);
  assert.equal(parseDownloads('downloads:929,views:8891'), 929);
  assert.throws(() => parseDownloads('views:8891'));
});
test('validates the badge identity and the sum of its difficulty counts', () => {
  assert.deepEqual(parseBadge(badge), {
    solved: 153,
    easy: 98,
    medium: 47,
    hard: 8,
  });
  assert.throws(() => parseBadge(badge.replace('153', '154')));
  assert.throws(() => parseBadge(badge.replace('47 Medium', 'Medium')));
  assert.throws(() => parseBadge(badge.replace('hvbhanot', 'another-user')));
});
