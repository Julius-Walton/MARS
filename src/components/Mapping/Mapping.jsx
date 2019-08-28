import React, { Component } from 'react'
import Panel from '../Panel/panel'
import './Mapping.css'



class Mapping extends Component {
  constructor(props){
    super(props);

    this.onChangeSourceFiles = this.onChangeSourceFiles.bind(this)
    this.onChangeSourceMap = this.onChangeSourceMap.bind(this)
    this.handleProceed = this.handleProceed.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }

  componentWillMount(e){
    console.log("Props: ", this.props)

  }
  componentWillReceiveProps(e){
    console.log("Props: ", this.props)
  }
  onChangeSourceMap(e){
    this.props.onChangeMapFileAction(e.target.files[0])
  }

  onChangeSourceFiles(e){
    let fileList = e.target.files
    let sourceFiles = []
    for (var i = 0; i < fileList.length; i++){
      sourceFiles[i] = fileList[i]
    }
    this.props.onChangeSourceFileAction(sourceFiles)

  }

  handleProceed(e){
    e.preventDefault()
    this.props.onProceed(this.props.mapFile, this.props.sourceFiles)
    this.props.history.push("upload")
  }

  handleContinue(e){
    e.preventDefault()
    this.props.history.push("upload")
  }
 
  render(){
    const displayProceed = () =>{
      if (this.props.mapFile && this.props.sourceFiles && (!this.props.uploadSamples)){
        return(
          <div>
            <button type="button" 
            className="submitButton" 
            onClick={this.handleProceed}>
              Proceed to Data Mapping
            </button>
          </div>

        )
      }else if (this.props.uploadSamples){
        return(
          <button type="button"
          className="submitButton"
          onClick={this.handleContinue}>
          Continue with Data Mapping
          </button>
        )
        
      }
    }

    return (
      <div className='upload'>
        <Panel name='Mapping Setup'>
          <div className='text'>
            Select your Mapping File
          </div>
          <input className="inputs" 
            type='file' name='file' 
            accept='.js' onChange={(e)=>this.onChangeSourceMap(e)}/>
          <div className='text'>
            Select your Sample Files
          </div>
          <input 
            className="inputs" 
            type='file' name='file' 
            accept='.csv' multiple onChange={(e)=>this.onChangeSourceFiles(e)}/>
          {displayProceed()}
        </Panel>
      </div>
    )
  }
}

export default Mapping
