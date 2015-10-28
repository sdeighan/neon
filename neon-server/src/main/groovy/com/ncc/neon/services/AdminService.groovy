/*
 * Copyright 2015 Next Century Corporation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.ncc.neon.services

import com.ncc.neon.query.mongo.SimpleQueryCache

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

/**
 * Service for running administrator commands.
 */

@Component
@Path("/adminservice")
class AdminService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService)

    /**
     * Clears the mongo query cache.
     * @return true
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("mongo/clearquerycache")
    String clearMongoQueryCache() {
        SimpleQueryCache.getSimpleQueryCacheInstance().clear()
        return true
    }
}
