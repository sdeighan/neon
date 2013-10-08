package com.ncc.neon.config.field
import org.codehaus.jackson.JsonGenerator
import org.codehaus.jackson.JsonProcessingException
import org.codehaus.jackson.map.JsonSerializer
import org.codehaus.jackson.map.ObjectMapper
import org.codehaus.jackson.map.SerializerProvider
/*
 * ************************************************************************
 * Copyright (c), 2013 Next Century Corporation. All Rights Reserved.
 *
 * This software code is the exclusive property of Next Century Corporation and is
 * protected by United States and International laws relating to the protection
 * of intellectual property.  Distribution of this software code by or to an
 * unauthorized party, or removal of any of these notices, is strictly
 * prohibited and punishable by law.
 *
 * UNLESS PROVIDED OTHERWISE IN A LICENSE AGREEMENT GOVERNING THE USE OF THIS
 * SOFTWARE, TO WHICH YOU ARE AN AUTHORIZED PARTY, THIS SOFTWARE CODE HAS BEEN
 * ACQUIRED BY YOU "AS IS" AND WITHOUT WARRANTY OF ANY KIND.  ANY USE BY YOU OF
 * THIS SOFTWARE CODE IS AT YOUR OWN RISK.  ALL WARRANTIES OF ANY KIND, EITHER
 * EXPRESSED OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE HEREBY EXPRESSLY
 * DISCLAIMED.
 *
 * PROPRIETARY AND CONFIDENTIAL TRADE SECRET MATERIAL NOT FOR DISCLOSURE OUTSIDE
 * OF NEXT CENTURY CORPORATION EXCEPT BY PRIOR WRITTEN PERMISSION AND WHEN
 * RECIPIENT IS UNDER OBLIGATION TO MAINTAIN SECRECY.
 *
 * 
 * @author tbrooks
 */

/**
 * Allows serialization of a map key, necessary for Jackson with a complex type as a key in a map.
 */

class WidgetDataSetKeySerializer extends JsonSerializer<WidgetDataSet> {
    private static final ObjectMapper MAPPER = new ObjectMapper()

    @Override
    void serialize(WidgetDataSet value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
        String json = MAPPER.writeValueAsString(value)
        jgen.writeFieldName(json)
    }
}