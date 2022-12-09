'use strict';

class Notes extends React.Component {

    render() {            
        {this.props.notes && this.props.notes.map(note => {
            return
            <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                <div class="grid grid-cols-1">
                    <div class="p-2">
                        <div class="flex items-center">
                            <div class="ml-4 text-lg leading-7 font-semibold">
                                { note._id } 
                            </div>
                        </div>

                        <div class="ml-4">
                            <div class="mt-2 mr-2 text-gray-600 dark:text-gray-400 text-sm">
                                { note.note }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })}          
    }
}


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      id: '',
      note: ''
    };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // get all entities - GET
    fetch("http://notes.local:8000/api/notes", {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }
        })
        .then(response => response.json())
        .then(response => {
            this.state.notes = response.data
        })
        .catch(err => {
        console.log(err);
        });
   }

  create(e) {
    // add entity - POST
    e.preventDefault();

    // creates entity
    fetch("http://notes.local:8000/api/notes", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        note: this.state.note
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch("http://notes.local:8000/api/notes", {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
            _id: this.state.id,
            note: this.state.note
        })
        })
        .then(response => response.json())
        .then(response => { console.log(response);
        })
        .catch(err => { console.log(err); });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(`http://notes.local:8000/api/notes/${this.state.id}`, {
      "method": "DELETE"
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Notepad</h1>
              <Notes notes={this.state.notes} />
              <form className="d-flex flex-column">
                <legend className="text-center">Add A Note</legend>
                <label htmlFor="notes">
                  Note:
                  <input
                    name="note"
                    id="note"
                    type="text"
                    className="form-control"
                    value={this.state.note}
                    onChange={(e) => this.handleChange({ notes: e.target.value })}
                    required
                    />
                </label>
                <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

let domContainer = document.querySelector('#App');
ReactDOM.render(<App />, domContainer);