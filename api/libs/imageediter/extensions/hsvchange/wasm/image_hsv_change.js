let wasm;
const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
function getObject(idx) { return heap[idx]; }
let heap_next = heap.length;
function dropObject(idx) {
    if (idx < 36)
        return;
    heap[idx] = heap_next;
    heap_next = idx;
}
function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
let cachegetUint16Memory0 = null;
function getUint16Memory0() {
    if (cachegetUint16Memory0 === null || cachegetUint16Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint16Memory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachegetUint16Memory0;
}
let WASM_VECTOR_LEN = 0;
function passArray16ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 2);
    getUint16Memory0().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}
function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
export function convert_hsv_to_rgb_wasm(in_hsv_array, out_rgb_array, len) {
    try {
        var ptr0 = passArray16ToWasm0(in_hsv_array, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(out_rgb_array, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.convert_hsv_to_rgb_wasm(ptr0, len0, ptr1, len1, len);
    }
    finally {
        out_rgb_array.set(getUint8Memory0().subarray(ptr1 / 1, ptr1 / 1 + len1));
        wasm.__wbindgen_free(ptr1, len1 * 1);
    }
}
export function convert_rgb_to_hsv_wasm(in_rgb_array, out_hsv_array, len) {
    try {
        var ptr0 = passArray8ToWasm0(in_rgb_array, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray16ToWasm0(out_hsv_array, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.convert_rgb_to_hsv_wasm(ptr0, len0, ptr1, len1, len);
    }
    finally {
        out_hsv_array.set(getUint16Memory0().subarray(ptr1 / 2, ptr1 / 2 + len1));
        wasm.__wbindgen_free(ptr1, len1 * 2);
    }
}
export function adjust_image_hsv_wasm(in_hsv_array, out_hsv_array, hue_multiplier, hue_range, saturation_multiplier, saturation_range, value_multipler, value_range, array_len) {
    try {
        var ptr0 = passArray16ToWasm0(in_hsv_array, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray16ToWasm0(out_hsv_array, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.adjust_image_hsv_wasm(ptr0, len0, ptr1, len1, hue_multiplier, hue_range, saturation_multiplier, saturation_range, value_multipler, value_range, array_len);
    }
    finally {
        out_hsv_array.set(getUint16Memory0().subarray(ptr1 / 2, ptr1 / 2 + len1));
        wasm.__wbindgen_free(ptr1, len1 * 2);
    }
}
export function adjust_image_hsv_from_rgb_wasm(in_rgb_array, out_rgb_array, hue_multiplier, hue_range, saturation_multiplier, saturation_range, value_multipler, value_range, array_len) {
    try {
        var ptr0 = passArray8ToWasm0(in_rgb_array, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(out_rgb_array, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.adjust_image_hsv_from_rgb_wasm(ptr0, len0, ptr1, len1, hue_multiplier, hue_range, saturation_multiplier, saturation_range, value_multipler, value_range, array_len);
    }
    finally {
        out_rgb_array.set(getUint8Memory0().subarray(ptr1 / 1, ptr1 / 1 + len1));
        wasm.__wbindgen_free(ptr1, len1 * 1);
    }
}
let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function addHeapObject(obj) {
    if (heap_next === heap.length)
        heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
}
let cachedTextEncoder = new TextEncoder('utf-8');
const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });
function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    let len = arg.length;
    let ptr = malloc(len);
    const mem = getUint8Memory0();
    let offset = 0;
    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F)
            break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
}
let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            }
            catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                }
                else {
                    throw e;
                }
            }
        }
        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    }
    else {
        const instance = await WebAssembly.instantiate(module, imports);
        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        }
        else {
            return instance;
        }
    }
}
async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_new_59cb74e423758ede = function () {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function (arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function (arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        }
        finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
        takeObject(arg0);
    };
    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }
    const { instance, module } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    return wasm;
}
export default init;
