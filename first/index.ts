interface Body {
    body: string;
}

function bodyFrom(data: any): Body | undefined {
    const { comment: { body } } = data;
    if (data) {
        return { body };
    }
    return undefined;
}

function responseFrom(body): Body {
    return { body };
}

export function run(context: any, data: any): any {
    context.log("GitHub Webhook triggered!", JSON.stringify(data));
    const body = bodyFrom(data);
    if (!body) {
        context.res = responseFrom('Unexpected data..');
        return context.done();
    }
    context.log(body);
    context.res = { ...body, rawData: data };
    context.done();
};