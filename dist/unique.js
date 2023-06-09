"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = void 0;
function unique(predicate) {
    return (element, index, arr) => arr.findIndex((a) => predicate(element, a)) === index;
}
exports.unique = unique;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VuaXF1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixNQUFNLENBQUksU0FBb0M7SUFDNUQsT0FBTyxDQUFDLE9BQVUsRUFBRSxLQUFhLEVBQUUsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFBO0FBQ3ZHLENBQUM7QUFGRCx3QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB1bmlxdWU8VD4ocHJlZGljYXRlOiAoZWw6IFQsIGl0OiBUKSA9PiBib29sZWFuKTogKGVsZW1lbnQ6IFQsIGluZGV4OiBudW1iZXIsIGFycjogVFtdKSA9PiBib29sZWFuIHtcbiAgcmV0dXJuIChlbGVtZW50OiBULCBpbmRleDogbnVtYmVyLCBhcnI6IFRbXSkgPT4gYXJyLmZpbmRJbmRleCgoYSkgPT4gcHJlZGljYXRlKGVsZW1lbnQsIGEpKSA9PT0gaW5kZXhcbn1cbiJdfQ==