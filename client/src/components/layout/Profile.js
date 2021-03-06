import React, { Component } from 'react'
import propTypes from "prop-types";
import { connect } from "react-redux";
import { uploadImg } from "../../actions/profileActions";
import { getCurrentProfile } from "../../actions/profileActions";

class Profile extends Component {
  state = {
    selectedFile: null
  }
    fileSelectHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
      if(this.state.selectedFile !== null) {

      
      const fd = new FormData();
      fd.append("file",this.state.selectedFile,this.state.selectedFile.name)
      this.props.uploadImg(fd);
      setTimeout(
        function() {
          this.props.getCurrentProfile();
        }
        .bind(this),
        5000
    );
  }
      
    }
  render() {
    
    const { user } = this.props.auth;
    const { data } = this.props.profile.profile;
    
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={data.img} alt="" />
                <input type="file" onChange={this.fileSelectHandler}/>
              </div>
            </div>
            <div className="text-center">
            <button className="lead" onClick={this.fileUploadHandler}>Upload</button>
              <h1 className="display-4 text-center">{user.name}</h1>
              <p className="lead text-center">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
Profile.propTypes = {
    profile: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    uploadImg: propTypes.func.isRequired,
    getCurrentProfile: propTypes.func.isRequired
  
  }
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  export default connect(mapStateToProps, {uploadImg, getCurrentProfile })(Profile);