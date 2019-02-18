import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';

import getWeb3 from "../utils/getWeb3";

@inject("store")
@observer
class Commit extends Component {
    constructor(props) {
        super(props);

        this.onCommit = this.onCommit.bind(this);
    }

    async onCommit() {
        const exploitable = this.refs.exploitable.value;
        const damage = this.refs.damage.value;

        const web3 = await getWeb3();
        const account = (await web3.eth.getAccounts())[0];
        const { vulnerabilities } = this.props.store;
        await vulnerabilities.commit(web3, account, exploitable, damage);

    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="contract address"
                    ref="exploitable"
                />
                <input
                    type="number"
                    placeholder="damage caused by vuln"
                    ref="damage"
                />
                <button onClick={this.onCommit}>Submit</button>
            </div>
        );
    }
}

export default Commit;