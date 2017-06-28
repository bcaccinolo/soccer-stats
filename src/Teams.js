import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const { Chart, Bars, Dots, Labels, Ticks, Layer, Animate } = require('rumble-charts');

class TeamsTable extends Component {

  state = {
    teams:[]
  }

  componentDidMount() {
    fetch('/teams').then(res => res.json())
                   .then(data => this.setState({teams: data}))
                   .then(state => this.displayGraph(1));

  }

  displayGraph(i){
    console.log('display graph');
    console.log(i);
    console.log(this.state.teams[i]);

    const team = this.state.teams[i];
    ReactDOM.render(<TeamGraph data={team} />, document.getElementById('teamgraph'));

  }

  showList(teams) {
    if(teams.length === 0){
      return (   <h3>
                  <span className="label label-info">
                    <i className="fa fa-spinner fa-spin" ></i>  Loading teams
                  </span>
                 </h3>)
    } else {
      return ( <table className='table table-striped' >
            <thead>
             <tr>
                <th>Rank</th>
                <th>Logo</th>
                <th>Team</th>
                <th>Points</th>
             </tr>
            </thead>
            <tbody>
              { teams.map((team, index) => <TeamEntry key={team.rank}
                                                      onClick={() => this.displayGraph(index) }
                                                      data={team} /> ) }
            </tbody>
          </table> )

    }
  }

  render() {

    const {teams} = this.state;

    return( <div> { this.showList(teams) } </div> )
  }
}

class TeamEntry extends Component {

  constructor(props) {
    super();
    this.state = props.data;
  }

  handleClick(e){
    console.log('click on a team entry');
  }

  render () {

    const {rank, logo, team, points} = this.state;
    const logo_path = "images/logos/" + logo + ".gif";

    return(
      <tr key={rank} onClick={this.props.onClick} >
        <td>{rank}</td>
        <td><img src={logo_path} alt='' /></td>
        <td>{team}</td>
        <td>{points}</td>
      </tr>
    )
  }
}

class TeamGraph extends Component {

  constructor(props){
    super();
    this.state = props.data;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.data);
  }

  render(){
    const {rank, logo, team, points, played, win, draw, lost,
            goalsFor, goalsAgainst, goalDifference} = this.state;
    const logo_path = "images/logos/" + logo + ".gif";

  const labels = ['rank', 'points', 'win', 'draw', 'lost', 'goals'];
  const series = [
    {data:[parseInt(rank, 10),
            parseInt(points, 10),
            parseInt(win, 10),
            parseInt(draw, 10),
            parseInt(lost, 10),
            parseInt(goalsFor, 10)
          ]}];

    return( <div className="panel panel-default">
              <div className="panel-heading">
                  <h3 className="panel-title">
                    <img src={logo_path} alt='' /> {team}
                  </h3>
                </div>
              <div className="panel-body">


<Chart width={400} height={400} series={series} minY={0}>
      <Layer width='80%' height='80%' position='middle center'>
        <Animate ease='bounce' _ease='elastic'>
        <Ticks
          axis='y'
          ticks={{maxTicks: 6}}
          tickVisible={({tick}) => tick.y > 0}
          lineLength='100%'
          lineVisible={true}
          lineStyle={{stroke:'lightgray'}}
          labelStyle={{textAnchor:'end',alignmentBaseline:'middle',fontSize:'0.85em',fontFamily:'sans-serif',fill:'lightgray'}}
          labelAttributes={{x: -5}}
        />
        <Ticks
          axis='x'
          label={({index,props}) => labels[index] }
          labelStyle={{textAnchor:'middle',alignmentBaseline:'before-edge',fontSize:'0.85em',fontFamily:'sans-serif',fill:'black'}}
          labelAttributes={{y: 10}}
        />
        <Bars
          groupPadding='3%'
          innerPadding='0.5%'
        />

        <Dots />
        <Labels
          label={({point}) => Math.round(point.y)}
          dotStyle={{
            alignmentBaseline:'after-edge',
            textAnchor:'middle',
            fontFamily:'sans-serif'
          }}
          labelAttributes={{y: -4}}
        />
        </Animate>
      </Layer>
    </Chart>

              </div>
            </div>
    )
  }
}

export default TeamsTable;
