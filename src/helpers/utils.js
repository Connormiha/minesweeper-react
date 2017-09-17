// @flow

export const bindMethods = (context: Object, methods: string[]) => {
    for (const method of methods) {
        context[method] = context[method].bind(context);
    }
};
