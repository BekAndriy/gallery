import React from 'react';
import { API } from '../constants/constants';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import admin from '../services/admin'

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            dataFields: {},
            images: []
        };
        this.handleSaveImageData = this.handleSaveImageData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveImage = this.handleRemoveImage.bind(this);
    }

    componentWillMount() {
        this.setState({images: this.props.images})
    }

    handleSaveImageData(id) {
        admin.updateData(id, this.state.dataFields['description-' + id]);
    }

    handleRemoveImage(id) {
        this.props.onRemove(id);
        console.log(this.state.dataFields);
        let data = Object.assign({}, this.state.dataFields);
        delete data['description-' + id];
        this.setState({dataFields: data});
        console.log(this.state.dataFields);
    }

    handleChange(e) {
        this.state.dataFields['description-'+e.target.dataset.id] = e.target.value;
        this.setState({dataFields: this.state.dataFields});
    }

    render() {


        return (
            <div className='grid'>
                {
                    this.props.images.map((el, ind) =>
                        <div className="image" key={ind}>
                        {

                            this.props.grid === '1' ?
                                <div>
                                    <div className="image-block" style={{background: 'url("'+API.link + el.image+'") no-repeat 50% 50%'}} />
                                    { this.state.dataFields['description-'+el.id] || el.tooltip ?
                                        <span className="tooltip">
                                            {this.state.dataFields['description-'+el.id] ? this.state.dataFields['description-'+el.id] : el.tooltip ? el.tooltip : ''}
                                        </span> : ''
                                    }
                                </div>
                                :
                                <div>
                                    <span data-id={el.id} className="image-block" style={{background: 'url("'+API.link + el.image+'") no-repeat 50% 50%'}} />
                                    <div className="content">
                                        <div className="textfield">
                                            <TextField
                                                hintText=""
                                                floatingLabelText="Description"
                                                floatingLabelFixed={true}
                                                fullWidth={true}
                                                multiLine={true}
                                                rows={3}
                                                data-id={el.id}
                                                rowsMax={5}
                                                defaultValue={el.tooltip}
                                                value={this.state.dataFields['description-'+el.id] ? this.state.dataFields['description-'+el.id] : el.tooltip ? el.tooltip : ''}
                                                onChange={this.handleChange}
                                                onBlur={this.handleSaveImageData.bind(null, el.id)}
                                            />
                                        </div>
                                        <div className="save">
                                            <div>
                                                <RaisedButton
                                                    label="Remove"
                                                    backgroundColor="#00bcd4"
                                                    labelColor="#FFFFFF"
                                                    onClick={this.handleRemoveImage.bind(null, el.id)}
                                                />
                                            </div>
                                            <div>
                                                <RaisedButton
                                                    label="Save"
                                                    backgroundColor="#00bcd4"
                                                    labelColor="#FFFFFF"
                                                    onClick={this.handleSaveImageData.bind(null, el.id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>)
                }
            </div>
        );
    }
}



export default  Grid;