const axios = require('axios');

function getJSON(options) {
    const url = `https://${options.hostname}${options.path}`;
    return axios.get(url,{
        headers: { 'Authorization': `token ${options.token}`}
    });
};

function Options(path,auth) {
    this.hostname = 'api.github.com';
    this.port = 443;
    this.path = path;
    this.method = 'GET';
    this.token  = auth;
};

function getUser(auth) {
    return getJSON(new Options(`/user`,auth));
}

function transformUser(gitData,auth) {
    return new Promise((resolve, reject) => {
        getRepos(gitData.login, auth).then(repos => {
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

const getFollowing = (auth) => {
    return new Promise((resolve, reject) => {
        getJSON(new Options(`/user/following`,auth)).then((resFollowing) => {
            const promises = resFollowing.data.map(i => { return getJSON(new Options(`/users/${i.login}`,auth)); });
            Promise.all(promises).then(resAll => {
                const promises = resAll.map(i => { return transformUser(i.data,auth); });
                Promise.all(promises)
                    .then(final => resolve (final.sort((a,b) => { return a.name.localeCompare(b.name); })))
                    .catch(e => reject(e));
            }).catch(e => reject(e));
        }).catch(e => reject(e));
    });
};

const getRepos = (gitLogin, auth) => {
    return new Promise((resolve, reject) => {
        getJSON(new Options(`/users/${gitLogin}/repos`,auth)).then((results) => {
            
            if(Array.isArray(results.data))
                resolve(results.data.map(transformRepo));
            else
                resolve([...results.data]);
        }).catch(e => reject(e));  
    })
}

module.exports = { followers: getFollowing};