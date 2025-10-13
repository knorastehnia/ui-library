import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'
import * as jestDomMatchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
expect.extend(jestDomMatchers)
