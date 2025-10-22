# fesk-rt
[![Tests](https://github.com/eiriksm/fesk-rt/actions/workflows/test.yml/badge.svg)](https://github.com/eiriksm/fesk-rt/actions/workflows/test.yml)

FESK decoding, real time ⚡

## Supported character codes

The decoder recognises the following 6-bit symbols. Each code maps to a
character that can appear in decoded output.

| Symbol | Bits | Decimal |
| ------ | ---- | ------- |
| `a` | `000000` | 0 |
| `b` | `000001` | 1 |
| `c` | `000010` | 2 |
| `d` | `000011` | 3 |
| `e` | `000100` | 4 |
| `f` | `000101` | 5 |
| `g` | `000110` | 6 |
| `h` | `000111` | 7 |
| `i` | `001000` | 8 |
| `j` | `001001` | 9 |
| `k` | `001010` | 10 |
| `l` | `001011` | 11 |
| `m` | `001100` | 12 |
| `n` | `001101` | 13 |
| `o` | `001110` | 14 |
| `p` | `001111` | 15 |
| `q` | `010000` | 16 |
| `r` | `010001` | 17 |
| `s` | `010010` | 18 |
| `t` | `010011` | 19 |
| `u` | `010100` | 20 |
| `v` | `010101` | 21 |
| `w` | `010110` | 22 |
| `x` | `010111` | 23 |
| `y` | `011000` | 24 |
| `z` | `011001` | 25 |
| `0` | `011010` | 26 |
| `1` | `011011` | 27 |
| `2` | `011100` | 28 |
| `3` | `011101` | 29 |
| `4` | `011110` | 30 |
| `5` | `011111` | 31 |
| `6` | `100000` | 32 |
| `7` | `100001` | 33 |
| `8` | `100010` | 34 |
| `9` | `100011` | 35 |
| Space (`␠`) | `100100` | 36 |
| `,` | `100101` | 37 |
| `:` | `100110` | 38 |
| `'` | `100111` | 39 |
| `"` | `101000` | 40 |

### Unused codes

The decoder currently leaves the following bit patterns unused. They are
reserved for future expansion and should not appear in normal frames.

| Bits | Decimal |
| ---- | ------- |
| `101001` | 41 |
| `101010` | 42 |
| `101011` | 43 |
| `101100` | 44 |
| `101101` | 45 |
| `101110` | 46 |
| `101111` | 47 |
| `110000` | 48 |
| `110001` | 49 |
| `110010` | 50 |
| `110011` | 51 |
| `110100` | 52 |
| `110101` | 53 |
| `110110` | 54 |
| `110111` | 55 |
| `111000` | 56 |
| `111001` | 57 |
| `111010` | 58 |
| `111011` | 59 |
| `111100` | 60 |
| `111101` | 61 |

Codes `111110` (62) and `111111` (63) are reserved for frame start/end markers
and are not emitted as characters.
