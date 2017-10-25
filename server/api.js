const axios = require('axios');
let token = null;

function getJSON(options) {
    const url = `https://${options.hostname}${options.path}`;
    return axios.get(url,{
        headers: { 'Authorization': `token ${token}`}
    });
};

function Options(path) {
    this.hostname = 'api.github.com';
    this.port = 443;
    this.path = path;
    this.method = 'GET';
};

function getUser(login) {
    return getJSON(new Options(`/users/${login}`));
}

function transformUser(gitData) {
    return new Promise((resolve, reject) => {
        getRepos(gitData.login).then(repos => {
            resolve( {
                id:         gitData.id,
                name:       gitData.name || gitData.login,
                company:    gitData.company || 'Not specified',
                avatar_url: gitData.avatar_url,
                repos:      repos
            });
        }).catch(err => reject(err));
    });
}

function transformRepo(repoData) {
    return {
        id:         repoData.id,
        name:       repoData.name,
        url:        repoData.svn_url,
        cloneUrl:   repoData.git_url,
        sshUrl:     repoData.ssh_url
    };
}

module.exports =  (gitLogin, auth) => {
    token = auth;
    return new Promise((resolve, reject) => {
        getUser(gitLogin).then(user => {
            if(user.message === 'Not Found') resolve([{id: 0, name:'Who?', company:'U.N.I.T', avatar_url:'https://goo.gl/z2bkaF'}]);

            getJSON(new Options(`/users/${user.login}/following`)).then((data) => {
                if(data.length === 0) resolve([transformUser(user)]);

                const promises = data.map(i => { return getJSON(new Options(`/users/${i.login}`)); });
                Promise.all(promises).then(results => {
                    const promises = results.map(i => { return transformUser(i); });
                    Promise.all(promises).then(final =>
                        resolve (final.sort((a,b) => { return a.name.localeCompare(b.name); })));
                    }).catch(e => reject(e));
                }).catch(e => reject(e));
            }).catch(e => reject(e));
        });
};

const getRepos = (gitLogin) => {
    return new Promise((resolve, reject) => {
        getJSON(new Options(`/users/${gitLogin}/repos`)).then((data) => {
            
            if(Array.isArray(data))
                resolve(data.map(transformRepo));
            else
                resolve([...data]);
        }).catch(e => reject(e));  
    })
}