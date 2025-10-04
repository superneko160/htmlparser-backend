import type { FetchDependencies } from './../types'
import { fetchUrl } from './../utils/fetchUrl'
import { splitString } from './../helpers/stringHelpers'
import { getAttributeOption } from './../helpers/attributeHelpers'

export const fetchDeps: FetchDependencies = {
    fetchUrl,
    splitString,
    getAttributeOption,
}
