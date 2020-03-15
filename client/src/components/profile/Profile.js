import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
            {
                profile == null || loading ?
                    <Spinner /> :
                    <Fragment>
                        <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                        {
                            auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                            (<Link to='/edit-profile' className="btn btn-dark>">Edit Profile</Link>)
                        }

                        <div class="profile-grid my-1">
                            <ProfileTop profile={profile} />

                            <ProfileAbout profile={profile} />

                            <div className="profile-exp bg-white p2">
                                <h2 className="bg-dark p-2">Experience</h2>
                                {
                                    profile.experience.length > 0 ? (<Fragment>
                                        {profile.experience.map(experience => (
                                            <ProfileExperience key={profile._id} experience={experience} />
                                        ))}
                                    </Fragment>) : (<h4>No Experience Credentials</h4>)
                                }
                            </div>
                            <div className="profile-edu bg-white p2">
                                <h2 className="bg-dark p-2">Education</h2>
                                {
                                    profile.education.length > 0 ? (<Fragment>
                                        {profile.education.map(education => (
                                            <ProfileEducation key={profile._id} education={education} />
                                        ))}
                                    </Fragment>) : (<h4>No Education Credentials</h4>)
                                }
                            </div>

                            {
                                profile.githubusername && (
                                    <ProfileGithub username={profile.githubusername} />
                                )
                            }
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
