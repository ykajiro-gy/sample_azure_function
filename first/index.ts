interface Body {
    body: string;
}

function bodyFrom(data: any): Body | undefined {
    const { comment } = data;
    const body = comment && comment.body;
    if (body) {
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
    const result = { ...body, rawData: data };
    context.log(result);
    context.res = result;
    context.done();
};