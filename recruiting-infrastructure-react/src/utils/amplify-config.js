const config = {
    // apiGateway: {
    //     REGION: "us-east-2",
    //     URL: "https://nfd9vi0dv3.execute-api.us-east-2.amazonaws.com/dev/api",
    // },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://oxyl4hpryb.execute-api.us-east-2.amazonaws.com/prod/api",
    },
    // apiGateway: {
    //     REGION: "us-east-2",
    //     URL: "https://d1ey7n6lv2zsao.cloudfront.net/api",
    // },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_rtKxtWSiU",
        APP_CLIENT_ID: "2fg0940t6fr80r5fn8c4sn2pnl",
        IDENTITY_POOL_ID: "us-east-2:e55be1ed-23d0-4027-aefe-80728e44269f",
    },
    // see amplify docs for s3 config
};

export default config;