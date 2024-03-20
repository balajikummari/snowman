import { SectionInterface } from './SectionInterface'

export interface InitialValuesInterface {
  name: string
  formId: string
  fingerprint: string
  estimationBy: string
  estimationFor: string
  provider: string
  region: string
  size: string
  edition: string
  sections: SectionInterface[]
  totalCost: number
  createdAt: string
  updatedAt: string
  editable: any[]
}
