// @flow

/**
 * Base function for bem naming with css modules
 * @param {Object} cssModule. Imported css module
 * @param {String} name. BEM name
 * @param {String} [element]
 * @param {Object} [mods]
 * @param {Object} [states]
 * @return {String}
 */
function block(cssModule: Object, name: string, element?: string, mods: any, states: any): string {
    const baseBlock = element ? `${name}__element` : name;
    let result = cssModule[baseBlock];

    if (mods) {
        result = Object.keys(mods)
            .reduce((acc, next) => {
                if (!(next in mods)) {
                    throw Error('Wrong css module name');
                }

                const modValue = mods[next];
                let mod;

                if (typeof modValue === 'boolean') {
                    if (modValue) {
                        mod = cssModule[`${baseBlock}_${next}`];
                    } else {
                        return acc;
                    }
                } else {
                    mod = cssModule[`${baseBlock}_${next}_${mods[next]}`];
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
}

const bem = (cssModule: Object, name: string): any =>
    block.bind(null, cssModule, name);

export default bem;
