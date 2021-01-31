---
layout: single
title:  "Decoding Facebook Relationships"
date:   2018-05-22 00:00:00 +0800
categories: dataviz
permalink: /data-viz/decoding-fb-friends
---

After discovering that Facebook personal data is easily downloadable, I wanted to see if there were interesting patterns in the relationships that I had built, and to see the common threads that connect me to my different FB friends. So I decided to do a bit of topic modelling to understand common topics I had with certain friends and to find out topics were popular across friends. 

## Data Overview

I only used a subset of the messages, including only messages from **Jan 2017 to April 2018**, and including only contacts who have had **100 message exchanges** with me in that time frame. I also only considered personal messages and did not include any messages from group chats. 

This left me with 72 contacts to analyze. I replaced each contact name with a label of my primary connection to them as seen below. This practice also served as an initial clustering which we can compare with our results below. **An interesting result would be if we can recover these groups based on the topics are present in our messages.**

![Friend Distribution](https://storage.googleapis.com/magtanggol-github-io/fb/FriendDist.png)

In total, I had nine contact groups. While some contacts belong to multiple groups, they were sorted based on primary connections. While the rest are clear, some clarifications on some groups:  
* Data: People I talk to about data science with
* MSc: Connections I made during my stay in HKUST
* HK are my friends in Hong Kong

While delineation of groups are clear, we would expect some groups to have similar topics (ex. Students and Co-teachers, HS/College/Work Friends), which we expect to show up in the analysis.

## Topic Modelling

To perform topic modelling, we first convert our data from text into a *term-frequency matrix*, which is a table counting the number of times a word appears in a conversation with a certain friend. 

![Term Frequency Matrix](https://storage.googleapis.com/magtanggol-github-io/fb/FB_Vectorizer.gif)

The animation above captures the high level process, but a lot of tweaking and testing is done during this process which largely determines how effective the resulting topic modelling will be. For example, a *huge* amount of time was spent on refining the stop words -- words that are removed from the messages because they don't provide meaning into a topic - like "and", "it", "the".  While there are many ready sources for english stop words, the difficulty was in adding Filipino (my native language) and conversational (ex. "lol", "haha", "hahahaha") stop words. 

With the term-frequency matrix ready, I used the **Latent Dirichlet Allocation (LDA)** model to generate common topics. The LDA model assumes that 

* Each document -- or in this case conversation -- is a mixture of topics, and 
* each topic is a mixture of certain words. 

We can then use the LDA model to, given a number of topics, recover the group of words that make up a each topic, and see the mixture of topics of a conversation. The image below captures the seven topics that I was able to recover from the conversations.

![Topics](https://storage.googleapis.com/magtanggol-github-io/fb/LDA.png)

The words on the right were the top words with the highest probability of being part of a certain topic, and the topic name on the left was from my interpretation of the top keywords. From here we see that

* Some topics are directly connected to some of my contact groups, like Ateneo, Hong Kong, Family, Data Science. 
* In the case of the Family topic, we see that what it captured was the manner of speaking to family members instead of a particular topic, capturing titles like "Kuya" (older brother) , "Mom" and "Dad" and terms of endearment like "Bes." 
* Some topics were a bit more difficult to decode, for example Life Discussion which, in itself, is a mix of topics that I usually like talking about with friends - data science, talking about businesses, playing overwatch, possibly taking an MBA, etc. 
* Daily Activities are more of answers to "How was your day?" or "What're you doing?" -- "going to school", "enjoy your day", "just getting some coffee", etc. 
* One topic which kept appearing and I could not get rid of was the first one -- which I could not give a reasonable interpretation to. At best, it is just a mixture of my personal interests. Luckily, however, this topic was not apparent in most of the conversations.


## Clustering Analysis

From the list of topics above, we can then generate the mixture of topics of each conversation. Specifically, this means that I can represent each friend by seven probabilities, with each probability showing how much of our conversation is made up of each topic. With this, we can use simple clustering techniques to find friends with common topic probabilities. We use the K-means clustering method, which, given a certain number of clusters, finds the best grouping that maximizes the similarity within each group. For our purposes, I choose nine clusters to represent the nine groups we had initially.

![Clustered](https://storage.googleapis.com/magtanggol-github-io/fb/K-Means.png)


As you can see from the results above, we did not get the initial groupings that we had expected. 

**The clusters that were easier to interpret were clusters that had a huge probability of discussing a topic that was in-line with the members of the clusters.**
For example, the Family Cluster is made up  primarily of Family members, and the most common topic is Family. The same goes for the Ateneo Cluster, which is made up of students and co-teachers, and the number one topic is Ateneo. We also have the Friend Cluster 1,  which are all made up of friends from various points in time, but the topics are more or less similar -- capturing Life Discussions where most of our talks would be catching up and updating each other on life.

**Then, we have clusters have clear topics, but mixed members.**
The Data Cluster captured all three data friends, but is made up of more than that. Looking at the specific persons behind the titles, these are friends that have, at one point or another, expressed interest in the topic as well. Interestingly, the co-teachers and students included in this clusters were the people I went with to a Data Science boot camp in 2017. For the Hong Kong Cluster, these are basically similar to Friend Cluster 1, with Life Discussions being a big part topic, but mixed in with Hong Kong specific conversations. 

**Lastly, we have hard to interpret clusters.**
Cluster 2, for example, is made of a mixed members, with the majority of topics being Ateneo and Life Discussion, suggesting an intersection of Ateneo connections and friends, in other words co-teachers or students who have become similar to friends. While this may be possible for the students and co-teachers in this group, we also have work friends and college friends in the same group, which, by looking at our conversations, are non-Ateneo friends who I talk to about teaching in Ateneo. Finally, Cluster 6 and 7 are outliers, where Cluster 6 includes my girlfriend, who I talk to everyday and makes up more than half of all messages, which makes sense why Daily Life is a popular topic.  Cluster 7 contains a one friend, made up completely of the undefined topic, which makes this specific cluster to interpret even after looking at the conversations. 

## Principal Component Analysis

![PCA GIF](https://storage.googleapis.com/magtanggol-github-io/fb/PCA.gif)


While the clustering analysis revealed a lot about our data, it doesn't tell us much about how different members and clusters interact and was biased by our selection of number of clusters. To this end, we perform **Principal Component Analysis (PCA)** in order to better visualize our results in one cohesive picture. PCA is a *dimension reduction technique* that is used with high dimensional data. In our case, we had seven dimensions for the seven topics. The goal is to be able to capture majority of the variance in our original data in less components, and each of the components just being combinations of the original features.​​​​​​​​​​​​​​

![1-D PCA GIF](https://storage.googleapis.com/magtanggol-github-io/fb/FistPC.png)

The image above shows how we convert the original data into the first principal component. As you can see from the equation above, the first component is just a *weighted combination of the different topic probabilities*, where each weight represents the importance of each of the original variables. 

As you can see, Ateneo as a topic has a strong positive weight at 0.731, while Life Discussion has a strong negative weight at -0.668. From this we can tell that the first PC captures segments the students from the friends -- **showing that there is a huge difference in how I talk to and what I talk about with my students/co-teachers and my friends.** The graph above plots the position of each friend based on the first principal component, and we see that the left end of the spectrum is made mostly of friends, while the right end shows co-teachers and students.

We do a similar analysis with the second component. Together, the graph below captures 58% of the total variance in the data. The color of the nodes represent the cluster from the clustering earlier, and the size shows the number of message exchanges between me and that friend.

![2-D PCA GIF](https://storage.googleapis.com/magtanggol-github-io/fb/PCA.png)


Immediately we can see the strong differentiation between three different contact groups: **Ateneo contacts, Data Science Contacts and Friends**. This means that there are rarely overlaps between these groups are rare and how I talk and what I talk about to people from the different groups are very distinct. 

We see that the Hong Kong, Family, Friend Cluster 2 and 3 are all very similar, occupying the same area. This is understandable as majority of my conversations with my family would have been updates on how life in Hong Kong has been. 

**We see that the while clustering is good to get an aggregate picture, PCA is good in giving us insights into specific individuals.** 

For example, we see that there are some friends under the Hong Kong cluster that are very similar and close to the friends cluster like HK Friend 2 and College Friend 13, who are friends I made prior to going to HK but have talked to a lot about Hong Kong. Another example is that Family 4 is a sibling that is taking her masters in Ateneo as well, and we have discussed previously about some of her requirements and topics in class. Student 3 is a student that has reached out a few times after my period teaching in Ateneo to ask for advice, and Co-Teacher 7 was my teacher and have reached out to multiple times regarding advice on different things. We also see Co-Teacher 1, Co-Teacher 9 and Student 8, all part of the Data Cluster, but are closer to the Ateneo cluster than the rest of the cluster. As mentioned above, these were teachers and students with who I attended a Data Science boot camp with.


