// @flow

const bem = (cssModule: any, name: string): any =>
    (element?: string, mods: any, states: any): string => {
        const baseBlock = element ? `${name}__element` : name;
        let result = cssModule[baseBlock];

        if (mods) {
            result = Object.keys(mods)
                .reduce((acc, next) => {
                    const mod = cssModule[`${baseBlock}_${next}_${mods[next]}`];

                    if (!mod) {
                        throw Error('Wrong css module name');
                    }

                    return `${acc} ${mod}`;
                }, result);
        }

        if (states) {
            result = Object.keys(states)
                .reduce((acc, next) => {
                    if (!states[next]) {
                        return acc;
                    }

                    const state = cssModule[`is-${next}`];

                    if (!state) {
                        throw Error('Wrong css module name');
                    }

                    return `${acc} ${state}`;
                }, result);
        }

        return result;
    };

export default bem;
