# fesk-rt
[![Tests](https://github.com/eiriksm/fesk-rt/actions/workflows/test.yml/badge.svg)](https://github.com/eiriksm/fesk-rt/actions/workflows/test.yml)

FESK decoding, real time ⚡

## Supported character codes

The decoder recognises the following 6-bit codes. The table lists every
possible pattern along with the symbol it represents or how it is reserved.

<details>
  <summary>Click to expand full table</summary>

| Bits    | Decimal | Symbol            | Notes                         |
| ------- | ------- | ----------------- | ----------------------------- |
| `000000` | 0 | `a` | |
| `000001` | 1 | `b` | |
| `000010` | 2 | `c` | |
| `000011` | 3 | `d` | |
| `000100` | 4 | `e` | |
| `000101` | 5 | `f` | |
| `000110` | 6 | `g` | |
| `000111` | 7 | `h` | |
| `001000` | 8 | `i` | |
| `001001` | 9 | `j` | |
| `001010` | 10 | `k` | |
| `001011` | 11 | `l` | |
| `001100` | 12 | `m` | |
| `001101` | 13 | `n` | |
| `001110` | 14 | `o` | |
| `001111` | 15 | `p` | |
| `010000` | 16 | `q` | |
| `010001` | 17 | `r` | |
| `010010` | 18 | `s` | |
| `010011` | 19 | `t` | |
| `010100` | 20 | `u` | |
| `010101` | 21 | `v` | |
| `010110` | 22 | `w` | |
| `010111` | 23 | `x` | |
| `011000` | 24 | `y` | |
| `011001` | 25 | `z` | |
| `011010` | 26 | `0` | |
| `011011` | 27 | `1` | |
| `011100` | 28 | `2` | |
| `011101` | 29 | `3` | |
| `011110` | 30 | `4` | |
| `011111` | 31 | `5` | |
| `100000` | 32 | `6` | |
| `100001` | 33 | `7` | |
| `100010` | 34 | `8` | |
| `100011` | 35 | `9` | |
| `100100` | 36 | Space (` `) | |
| `100101` | 37 | `,` | |
| `100110` | 38 | `:` | |
| `100111` | 39 | `'` | |
| `101000` | 40 | `"` | |
| `101001` | 41 | — | Reserved for future expansion |
| `101010` | 42 | — | Reserved for future expansion |
| `101011` | 43 | — | Reserved for future expansion |
| `101100` | 44 | — | Reserved for future expansion |
| `101101` | 45 | — | Reserved for future expansion |
| `101110` | 46 | — | Reserved for future expansion |
| `101111` | 47 | — | Reserved for future expansion |
| `110000` | 48 | — | Reserved for future expansion |
| `110001` | 49 | — | Reserved for future expansion |
| `110010` | 50 | — | Reserved for future expansion |
| `110011` | 51 | — | Reserved for future expansion |
| `110100` | 52 | — | Reserved for future expansion |
| `110101` | 53 | — | Reserved for future expansion |
| `110110` | 54 | — | Reserved for future expansion |
| `110111` | 55 | — | Reserved for future expansion |
| `111000` | 56 | — | Reserved for future expansion |
| `111001` | 57 | — | Reserved for future expansion |
| `111010` | 58 | — | Reserved for future expansion |
| `111011` | 59 | — | Reserved for future expansion |
| `111100` | 60 | — | Reserved for future expansion |
| `111101` | 61 | — | Reserved for future expansion |
| `111110` | 62 | — | Frame start marker |
| `111111` | 63 | — | Frame end marker |

</details>

Codes 41 through 61 are reserved for future expansion and should not appear in
normal frames. Codes 62 and 63 mark frame boundaries and are not emitted as
characters.

## Why "FESK"?
FESK is a word play on FSK [(Frequency-shift keying](https://en.wikipedia.org/wiki/Frequency-shift_keying)). The FESK protocol itself is a binary FSK (BFSK). But the word “fesk” means “fish” in northern Norwegian dialect. Coincidentally, in Norway, I would say one can also use the word as a mild swear word. Something like “what the fish” or “oh… fish!”

## Built with AI Assistance

This project is crafted with help from AI collaborators while always remaining under human supervision. OpenAI's gpt-5-codex model assists with coding reviews and implementation planning, and Anthropic's Claude 3.5 Sonnet model provides complementary insights during those same review and planning sessions. Together they accelerate development without replacing the judgment of the humans who guide every change.

