"use strict";
// source: ui.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();
var session_pb = require('./session_pb.js');
goog.object.extend(proto, session_pb);
goog.exportSymbol('proto.proto.GlobalSearchStreamRequest', null, global);
goog.exportSymbol('proto.proto.GlobalSearchStreamResponse', null, global);
goog.exportSymbol('proto.proto.SearchbarStreamRequest', null, global);
goog.exportSymbol('proto.proto.SearchbarStreamResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.GlobalSearchStreamResponse = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.GlobalSearchStreamResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.proto.GlobalSearchStreamResponse.displayName = 'proto.proto.GlobalSearchStreamResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.SearchbarStreamResponse = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.SearchbarStreamResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.proto.SearchbarStreamResponse.displayName = 'proto.proto.SearchbarStreamResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.GlobalSearchStreamRequest = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.GlobalSearchStreamRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.proto.GlobalSearchStreamRequest.displayName = 'proto.proto.GlobalSearchStreamRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.SearchbarStreamRequest = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.SearchbarStreamRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.proto.SearchbarStreamRequest.displayName = 'proto.proto.SearchbarStreamRequest';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.proto.GlobalSearchStreamResponse.prototype.toObject = function (opt_includeInstance) {
        return proto.proto.GlobalSearchStreamResponse.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.proto.GlobalSearchStreamResponse} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.proto.GlobalSearchStreamResponse.toObject = function (includeInstance, msg) {
        var f, obj = {
            text: jspb.Message.getFieldWithDefault(msg, 1, ""),
            error: jspb.Message.getFieldWithDefault(msg, 15, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.GlobalSearchStreamResponse}
 */
proto.proto.GlobalSearchStreamResponse.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.proto.GlobalSearchStreamResponse;
    return proto.proto.GlobalSearchStreamResponse.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.GlobalSearchStreamResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.GlobalSearchStreamResponse}
 */
proto.proto.GlobalSearchStreamResponse.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setText(value);
                break;
            case 15:
                var value = /** @type {string} */ (reader.readString());
                msg.setError(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.GlobalSearchStreamResponse.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.proto.GlobalSearchStreamResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.GlobalSearchStreamResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.GlobalSearchStreamResponse.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getText();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getError();
    if (f.length > 0) {
        writer.writeString(15, f);
    }
};
/**
 * optional string text = 1;
 * @return {string}
 */
proto.proto.GlobalSearchStreamResponse.prototype.getText = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/**
 * @param {string} value
 * @return {!proto.proto.GlobalSearchStreamResponse} returns this
 */
proto.proto.GlobalSearchStreamResponse.prototype.setText = function (value) {
    return jspb.Message.setProto3StringField(this, 1, value);
};
/**
 * optional string error = 15;
 * @return {string}
 */
proto.proto.GlobalSearchStreamResponse.prototype.getError = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 15, ""));
};
/**
 * @param {string} value
 * @return {!proto.proto.GlobalSearchStreamResponse} returns this
 */
proto.proto.GlobalSearchStreamResponse.prototype.setError = function (value) {
    return jspb.Message.setProto3StringField(this, 15, value);
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.proto.SearchbarStreamResponse.prototype.toObject = function (opt_includeInstance) {
        return proto.proto.SearchbarStreamResponse.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.proto.SearchbarStreamResponse} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.proto.SearchbarStreamResponse.toObject = function (includeInstance, msg) {
        var f, obj = {
            text: jspb.Message.getFieldWithDefault(msg, 1, ""),
            error: jspb.Message.getFieldWithDefault(msg, 15, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.SearchbarStreamResponse}
 */
proto.proto.SearchbarStreamResponse.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.proto.SearchbarStreamResponse;
    return proto.proto.SearchbarStreamResponse.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.SearchbarStreamResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.SearchbarStreamResponse}
 */
proto.proto.SearchbarStreamResponse.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setText(value);
                break;
            case 15:
                var value = /** @type {string} */ (reader.readString());
                msg.setError(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.SearchbarStreamResponse.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.proto.SearchbarStreamResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.SearchbarStreamResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.SearchbarStreamResponse.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getText();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getError();
    if (f.length > 0) {
        writer.writeString(15, f);
    }
};
/**
 * optional string text = 1;
 * @return {string}
 */
proto.proto.SearchbarStreamResponse.prototype.getText = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};
/**
 * @param {string} value
 * @return {!proto.proto.SearchbarStreamResponse} returns this
 */
proto.proto.SearchbarStreamResponse.prototype.setText = function (value) {
    return jspb.Message.setProto3StringField(this, 1, value);
};
/**
 * optional string error = 15;
 * @return {string}
 */
proto.proto.SearchbarStreamResponse.prototype.getError = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 15, ""));
};
/**
 * @param {string} value
 * @return {!proto.proto.SearchbarStreamResponse} returns this
 */
proto.proto.SearchbarStreamResponse.prototype.setError = function (value) {
    return jspb.Message.setProto3StringField(this, 15, value);
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.proto.GlobalSearchStreamRequest.prototype.toObject = function (opt_includeInstance) {
        return proto.proto.GlobalSearchStreamRequest.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.proto.GlobalSearchStreamRequest} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.proto.GlobalSearchStreamRequest.toObject = function (includeInstance, msg) {
        var f, obj = {
            session: (f = msg.getSession()) && session_pb.Session.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.GlobalSearchStreamRequest}
 */
proto.proto.GlobalSearchStreamRequest.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.proto.GlobalSearchStreamRequest;
    return proto.proto.GlobalSearchStreamRequest.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.GlobalSearchStreamRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.GlobalSearchStreamRequest}
 */
proto.proto.GlobalSearchStreamRequest.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new session_pb.Session;
                reader.readMessage(value, session_pb.Session.deserializeBinaryFromReader);
                msg.setSession(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.GlobalSearchStreamRequest.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.proto.GlobalSearchStreamRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.GlobalSearchStreamRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.GlobalSearchStreamRequest.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getSession();
    if (f != null) {
        writer.writeMessage(1, f, session_pb.Session.serializeBinaryToWriter);
    }
};
/**
 * optional Session session = 1;
 * @return {?proto.proto.Session}
 */
proto.proto.GlobalSearchStreamRequest.prototype.getSession = function () {
    return /** @type{?proto.proto.Session} */ (jspb.Message.getWrapperField(this, session_pb.Session, 1));
};
/**
 * @param {?proto.proto.Session|undefined} value
 * @return {!proto.proto.GlobalSearchStreamRequest} returns this
*/
proto.proto.GlobalSearchStreamRequest.prototype.setSession = function (value) {
    return jspb.Message.setWrapperField(this, 1, value);
};
/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.GlobalSearchStreamRequest} returns this
 */
proto.proto.GlobalSearchStreamRequest.prototype.clearSession = function () {
    return this.setSession(undefined);
};
/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.GlobalSearchStreamRequest.prototype.hasSession = function () {
    return jspb.Message.getField(this, 1) != null;
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.proto.SearchbarStreamRequest.prototype.toObject = function (opt_includeInstance) {
        return proto.proto.SearchbarStreamRequest.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.proto.SearchbarStreamRequest} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.proto.SearchbarStreamRequest.toObject = function (includeInstance, msg) {
        var f, obj = {
            session: (f = msg.getSession()) && session_pb.Session.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.SearchbarStreamRequest}
 */
proto.proto.SearchbarStreamRequest.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.proto.SearchbarStreamRequest;
    return proto.proto.SearchbarStreamRequest.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.SearchbarStreamRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.SearchbarStreamRequest}
 */
proto.proto.SearchbarStreamRequest.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new session_pb.Session;
                reader.readMessage(value, session_pb.Session.deserializeBinaryFromReader);
                msg.setSession(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.SearchbarStreamRequest.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.proto.SearchbarStreamRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.SearchbarStreamRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.SearchbarStreamRequest.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getSession();
    if (f != null) {
        writer.writeMessage(1, f, session_pb.Session.serializeBinaryToWriter);
    }
};
/**
 * optional Session session = 1;
 * @return {?proto.proto.Session}
 */
proto.proto.SearchbarStreamRequest.prototype.getSession = function () {
    return /** @type{?proto.proto.Session} */ (jspb.Message.getWrapperField(this, session_pb.Session, 1));
};
/**
 * @param {?proto.proto.Session|undefined} value
 * @return {!proto.proto.SearchbarStreamRequest} returns this
*/
proto.proto.SearchbarStreamRequest.prototype.setSession = function (value) {
    return jspb.Message.setWrapperField(this, 1, value);
};
/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.SearchbarStreamRequest} returns this
 */
proto.proto.SearchbarStreamRequest.prototype.clearSession = function () {
    return this.setSession(undefined);
};
/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.SearchbarStreamRequest.prototype.hasSession = function () {
    return jspb.Message.getField(this, 1) != null;
};
goog.object.extend(exports, proto.proto);