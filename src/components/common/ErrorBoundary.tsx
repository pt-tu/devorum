import { Button, Card } from '@nextui-org/react'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[95vh] w-full overflow-hidden">
          <div className="m-auto">
            <Card className="space-y-6 p-8">
              <p>Oops, there is an error!</p>
              <Button onClick={() => this.setState({ hasError: false })}>Try again?</Button>
            </Card>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
