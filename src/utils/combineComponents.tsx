import React, { ComponentProps, FC } from 'react'

type CombineProps = {
  children?: React.ReactNode
}

export const combineComponents = (...components: FC[]): FC<CombineProps> => {
  return components.reduce(
    (AccumulatedComponents: FC<CombineProps>, CurrentComponent: FC<CombineProps>) => {
      return ({ children }: ComponentProps<FC<CombineProps>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }: CombineProps) => <>{children}</>
  )
}
