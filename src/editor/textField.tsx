import * as React from 'react'
import MonacoEditor from 'react-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';


export interface TextFieldProps {
  code: string
  setCode: (code: string) => void
}
export interface TextFieldState {}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
  constructor(props: TextFieldProps) {
    super(props)

    if (localStorage.getItem('elements-3d-code') == null) {
      localStorage.setItem('elements-3d-code', '')
    }

    this.state = {
      language: 'javascript',
    }
  }

  componentDidMount() {}

  editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    editor.focus()
  }

  render() {
    const options = {
      selectOnLineNumbers: true,
    }

    return (
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={this.props.code}
        options={options}
        onChange={(value: string) => {
          this.props.setCode(value)
        }}
        editorDidMount={this.editorDidMount}
      />
    )
  }
}
