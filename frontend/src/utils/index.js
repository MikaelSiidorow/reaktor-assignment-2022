import { formatDistance } from 'date-fns'

export const dateParser = (t) => {
  return formatDistance(new Date(t), new Date()) + ' ago'
}