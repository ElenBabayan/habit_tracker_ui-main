import './dialog.css';
import React from 'react';

class AddDialog  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillTitle: '',
            shortDescription: '',
            wikiLink: '',
        };
    }

    handleSkillTitleChange = (e) => {
        this.setState({ skillTitle: e.target.value });
    }

    handleShortDescriptionChange = (e) => {
        this.setState({ shortDescription: e.target.value });
    }

    handleWikiLinkChange = (e) => {
        this.setState({ wikiLink: e.target.value });
    }

    saveAddCompentecyDialog = () => {
        this.props.onSave(this.state)
    }

    cancelAddCompentecyDialog = () => {
       this.props.onCancel()
    }

    render() {
        return (
            <div>
                <div className="dialog-overlay"></div>
                <div className="dialog-box">
                    <div className="title-bar">
                        <div className="title-intro">Add a competency for</div>
                        <div className="title">"User Experience Specialist"</div>
                        <div className="close-box" onClick={this.cancelAddCompentecyDialog}>
                            <i className="fa fa-times close-icon"></i>
                        </div>
                    </div>
                    <div className="skill">
                        <input
                            type="text"
                            id="skill-input"
                            placeholder="Skill Title"
                            value={this.state.skillTitle}
                            onChange={this.handleSkillTitleChange}
                        />
                    </div>
                    <div className="short-description">
            <textarea
                rows="4"
                cols="100"
                id="short-description-input"
                placeholder="Short Description (200 character max)"
                value={this.state.shortDescription}
                onChange={this.handleShortDescriptionChange}
            ></textarea>
                    </div>

                    <div className="wiki">
                        <label htmlFor="wiki-input" className="wiki-label">
                            Add link to a wikipedia article:
                        </label>
                        <input
                            type="text"
                            id="wiki-input"
                            value={this.state.wikiLink}
                            onChange={this.handleWikiLinkChange}
                        />
                    </div>
                    <div className="save-cancel">
                        <div className="save" onClick={this.saveAddCompentecyDialog}>
                            Save
                        </div>
                        <div className="cancel" onClick={this.cancelAddCompentecyDialog}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddDialog;
