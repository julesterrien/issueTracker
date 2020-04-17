import axios from 'axios';

const ERROR = 'Something went wrong. Please try again.';

export const getUser = async (accessToken) => {
  try {
    const response = await axios.get(`https://api.github.com/user`, {
      headers: {
        'Authorization': `token ${accessToken}`
      },
    });
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}

export const getRepos = async (accessToken) => {
  try {
    const response = await axios.get(`https://api.github.com/user/repos`, {
      headers: {
        'Authorization': `token ${accessToken}`
      },
    });
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}


export const getIssues = async ({
  repoFullName,
  accessToken,
}) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoFullName}/issues`, {
      headers: {
        'Authorization': `token ${accessToken}`
      },
    });
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}
