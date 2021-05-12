import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: 'shinchan'
        };
    };

    handleChange = event => {
        this.setState({
            term: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-group">
                    <div className="d-flex flex-row">
                        <label><p className="h4 text-primary mt-3 ml-3">Search</p></label>
                        <input class="form-control" onChange={this.handleChange} type="text" value={this.state.term}
                            style={{ width: '50%', margin: '10px auto' }}
                        />
                    </div>
                </form>
            </div>
        );
    }
};

export default SearchBar;