export function cast(type: "string"| "number" | "boolean", value: any, isArray: boolean = false): any{
    if (isArray ) {
        const array = Array(value);
        return array.map(item => cast(type, item));
    }

    switch (type) {
        case "string":
            return String(value);
        case "number":
            return Number(value);
        case "boolean":
            return Boolean(value);
        default:
            return value;
    }
}