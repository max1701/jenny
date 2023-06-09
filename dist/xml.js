"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xml = void 0;
const xmldom_1 = require("@xmldom/xmldom");
const MIME_TYPE__TEXT_XML = 'text/xml';
function buildCharTranslationTable(...chars) {
    const table = {};
    for (let i = 0; i < chars.length; i += 2) {
        table[`${chars[i].charCodeAt(0)}`] = chars[i + 1];
    }
    return table;
}
const specialCharTranslationTable = buildCharTranslationTable('Ä', 'ae', 'Ü', 'Ue', 'Ö', 'Oe', 'ä', 'ae', 'ü', 'ue', 'ö', 'oe', 'ß', 'sz');
class Xml {
    static of(source) {
        return new Xml(source);
    }
    constructor(source) {
        this.serializer = new xmldom_1.XMLSerializer();
        this.document = typeof source === 'string' ? parseFromString(source) : source;
    }
    get() {
        return this.document;
    }
    getAsString() {
        return this.serializer.serializeToString(this.document);
    }
    withTextElementAdded(parentTagName, tagName, value) {
        const element = this.elementWithTextNode(tagName, value);
        const parents = this.document.getElementsByTagName(parentTagName);
        if (parents.length > 0) {
            parents[0].appendChild(element);
        }
        return this;
    }
    withTextValueSet(tagName, value) {
        const textNode = this.document.createTextNode(specialCharEncoder(value));
        const elements = this.document.getElementsByTagName(tagName);
        if (elements && elements.length > 0) {
            while (elements[0].hasChildNodes()) {
                elements[0].removeChild(elements[0].childNodes[0]);
            }
            elements[0].appendChild(textNode);
        }
        return this;
    }
    elementWithTextNode(tagName, value) {
        const element = this.document.createElement(tagName);
        const textNode = this.document.createTextNode(specialCharEncoder(value));
        element.appendChild(textNode);
        return element;
    }
}
exports.Xml = Xml;
function parseFromString(source) {
    return new xmldom_1.DOMParser().parseFromString(source, MIME_TYPE__TEXT_XML);
}
function specialCharEncoder(value) {
    return value.replace(/[\u00C4\u00D6\u00DC\u00E4\u00F6\u00FC\u00DF]/g, (i) => specialCharTranslationTable[`${i.charCodeAt(0)}`]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3htbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBdUQ7QUFFdkQsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUE7QUFFdEMsU0FBUyx5QkFBeUIsQ0FBQyxHQUFHLEtBQWU7SUFDbkQsTUFBTSxLQUFLLEdBQTRCLEVBQUUsQ0FBQTtJQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFFRCxNQUFNLDJCQUEyQixHQUFHLHlCQUF5QixDQUMzRCxHQUFHLEVBQ0gsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILElBQUksRUFDSixHQUFHLEVBQ0gsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILElBQUksRUFDSixHQUFHLEVBQ0gsSUFBSSxDQUNMLENBQUE7QUFFRCxNQUFhLEdBQUc7SUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQXlCO1FBQ2pDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUtELFlBQW9CLE1BQXlCO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBYSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQy9FLENBQUM7SUFFRCxHQUFHO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsYUFBcUIsRUFBRSxPQUFlLEVBQUUsS0FBYTtRQUN4RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDakUsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBZSxFQUFFLEtBQWE7UUFDN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUN4RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzVELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNsQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNuRDtZQUNELFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDbEM7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsS0FBYTtRQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ3hFLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDN0IsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztDQUNGO0FBaERELGtCQWdEQztBQUVELFNBQVMsZUFBZSxDQUFDLE1BQWM7SUFDckMsT0FBTyxJQUFJLGtCQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUE7QUFDckUsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBYTtJQUN2QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsK0NBQStDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET01QYXJzZXIsIFhNTFNlcmlhbGl6ZXJ9IGZyb20gJ0B4bWxkb20veG1sZG9tJ1xuXG5jb25zdCBNSU1FX1RZUEVfX1RFWFRfWE1MID0gJ3RleHQveG1sJ1xuXG5mdW5jdGlvbiBidWlsZENoYXJUcmFuc2xhdGlvblRhYmxlKC4uLmNoYXJzOiBzdHJpbmdbXSk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgdGFibGU6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHRhYmxlW2Ake2NoYXJzW2ldLmNoYXJDb2RlQXQoMCl9YF0gPSBjaGFyc1tpICsgMV1cbiAgfVxuICByZXR1cm4gdGFibGVcbn1cblxuY29uc3Qgc3BlY2lhbENoYXJUcmFuc2xhdGlvblRhYmxlID0gYnVpbGRDaGFyVHJhbnNsYXRpb25UYWJsZShcbiAgJ8OEJyxcbiAgJ2FlJyxcbiAgJ8OcJyxcbiAgJ1VlJyxcbiAgJ8OWJyxcbiAgJ09lJyxcbiAgJ8OkJyxcbiAgJ2FlJyxcbiAgJ8O8JyxcbiAgJ3VlJyxcbiAgJ8O2JyxcbiAgJ29lJyxcbiAgJ8OfJyxcbiAgJ3N6JyxcbilcblxuZXhwb3J0IGNsYXNzIFhtbCB7XG4gIHN0YXRpYyBvZihzb3VyY2U6IHN0cmluZyB8IERvY3VtZW50KTogWG1sIHtcbiAgICByZXR1cm4gbmV3IFhtbChzb3VyY2UpXG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZXI6IFhNTFNlcmlhbGl6ZXJcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHNvdXJjZTogc3RyaW5nIHwgRG9jdW1lbnQpIHtcbiAgICB0aGlzLnNlcmlhbGl6ZXIgPSBuZXcgWE1MU2VyaWFsaXplcigpXG4gICAgdGhpcy5kb2N1bWVudCA9IHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnID8gcGFyc2VGcm9tU3RyaW5nKHNvdXJjZSkgOiBzb3VyY2VcbiAgfVxuXG4gIGdldCgpOiBEb2N1bWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRcbiAgfVxuXG4gIGdldEFzU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyh0aGlzLmRvY3VtZW50KVxuICB9XG5cbiAgd2l0aFRleHRFbGVtZW50QWRkZWQocGFyZW50VGFnTmFtZTogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBYbWwge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRXaXRoVGV4dE5vZGUodGFnTmFtZSwgdmFsdWUpXG4gICAgY29uc3QgcGFyZW50cyA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocGFyZW50VGFnTmFtZSlcbiAgICBpZiAocGFyZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJlbnRzWzBdLmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB3aXRoVGV4dFZhbHVlU2V0KHRhZ05hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFhtbCB7XG4gICAgY29uc3QgdGV4dE5vZGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNwZWNpYWxDaGFyRW5jb2Rlcih2YWx1ZSkpXG4gICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpXG4gICAgaWYgKGVsZW1lbnRzICYmIGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHdoaWxlIChlbGVtZW50c1swXS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgZWxlbWVudHNbMF0ucmVtb3ZlQ2hpbGQoZWxlbWVudHNbMF0uY2hpbGROb2Rlc1swXSlcbiAgICAgIH1cbiAgICAgIGVsZW1lbnRzWzBdLmFwcGVuZENoaWxkKHRleHROb2RlKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcHJpdmF0ZSBlbGVtZW50V2l0aFRleHROb2RlKHRhZ05hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpXG4gICAgY29uc3QgdGV4dE5vZGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNwZWNpYWxDaGFyRW5jb2Rlcih2YWx1ZSkpXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSlcbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRnJvbVN0cmluZyhzb3VyY2U6IHN0cmluZyk6IERvY3VtZW50IHtcbiAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc291cmNlLCBNSU1FX1RZUEVfX1RFWFRfWE1MKVxufVxuXG5mdW5jdGlvbiBzcGVjaWFsQ2hhckVuY29kZXIodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXFx1MDBDNFxcdTAwRDZcXHUwMERDXFx1MDBFNFxcdTAwRjZcXHUwMEZDXFx1MDBERl0vZywgKGkpID0+IHNwZWNpYWxDaGFyVHJhbnNsYXRpb25UYWJsZVtgJHtpLmNoYXJDb2RlQXQoMCl9YF0pXG59XG4iXX0=