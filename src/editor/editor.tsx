import * as React from 'react'
import { TextField } from './textField'
import { DisplayBox } from './display-box';

export interface EditorProps {}

export interface EditorState {
  code: string
}

export class Editor extends React.Component<EditorProps, EditorState> {
  editor: HTMLDivElement
  constructor(props: EditorProps) {
    super(props)
    this.state = {
      code: this.loadFromLocalStorage() || '',
    }
    this.editor = document.getElementById('editor') as HTMLDivElement
  }

  onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    var file = e.dataTransfer.files[0]
    this.editor.classList.remove('dragOver')
    const reader: FileReader = new FileReader()
    reader.onload = (e: ProgressEvent) => {
      this.setCode(reader.result as string)
    }
    reader.readAsText(file)
  }

  onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    this.editor.classList.add('dragOver')
  }

  onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    this.editor.classList.remove('dragOver')
  }

  setCode (value: string) {
    this.setState({
      code: value,
    })
    this.saveToLocalStorage(value)
  }

  loadFromLocalStorage = () => {
    return localStorage.getItem('elements-3d-code')
  }

  resetCode = () => {
    this.setState({
      code: '',
    })
  }

  saveToLocalStorage = (value: string) => {
    localStorage.setItem('elements-3d-code', value)
  }

  render() {
    return (
      <div
        id="editor"
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TextField
          code={this.state.code}
          setCode={this.setCode.bind(this)}
        />
        <DisplayBox
          code={this.state.code}
        />
      </div>
    )
  }
}
