[← Previous: Statistical Concepts](a-statistical-concepts.md) | [Table of contents](../main.md#chapters) | [Next: Bellman Optimality Derivation](c-bellman-optimality-derivation.md) →

# Bellman Expectation Derivation

## Goal

Derive the Bellman expectation equations for a fixed policy $\pi$, and also the policy-averaged form of $V^\pi$ used in matrix policy evaluation.

$$
V^\pi(s)
=
\sum_{a}
\pi(a \mid s)
\sum_{s',r}
P(s',r \mid s,a)
[
r + \gamma V^\pi(s')
].


$$
Q^\pi(s,a)
=
\sum_{s',r}
P(s',r \mid s,a)
[
r + \gamma \sum_{a'} \pi(a' \mid s') Q^\pi(s',a')
].


$$
V^\pi(s)
=
R^\pi(s)
+
\gamma
\sum_{s'}
P^\pi(s' \mid s)\, V^\pi(s').

$$

B.3 derives (B.1) and (B.3), with compact form (B.11). B.4 derives (B.2), with compact form (B.18). B.5 collects the expectation links between $V^\pi$ and $Q^\pi$ used in later chapters. Expected rewards $R(s,a,s')$, $R(s,a)$, and $R^\pi(s)$ are (B.4), (B.5), and (B.12).

## Expected rewards

$$
R(s,a,s')=\mathbb{E}[R_{t+1}\mid S_t=s,A_t=a,S_{t+1}=s'];
\quad\text{expected reward from taking $a$ in $s$ and arriving at $s'$}.

$$
R(s,a,s')
&=
\sum_r r\, P(R_{t+1}=r\mid S_t=s,A_t=a,S_{t+1}=s')
\quad\text{[A.3; conditional expectation]}
\\
&=
\sum_r r\, \frac{P(s',r\mid s,a)}{P(s'\mid s,a)}
\quad\text{[conditional probability]}.

$$
R(s,a,s')
=
\sum_r r\, \frac{P(s',r\mid s,a)}{P(s'\mid s,a)}.


$$
R(s,a)=\mathbb{E}[R_{t+1}\mid S_t=s,A_t=a];
\quad\text{expected reward from taking $a$ in $s$}.

Expand over the next state by (A.7), then substitute (B.4):

$$
R(s,a)
&=
\sum_{s'}
\mathbb{E}[R_{t+1}\mid S_t=s,A_t=a,S_{t+1}=s']
\,
P(s'\mid s,a)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_{s'}
R(s,a,s')\, P(s'\mid s,a)
\\
&=
\sum_{s'}
\Bigl(
\sum_r r\, \frac{P(s',r\mid s,a)}{P(s'\mid s,a)}
\Bigr)
P(s'\mid s,a)
\quad\text{[(B.4)]}
\\
&=
\sum_{s',r} r\, P(s',r\mid s,a).

$$
R(s,a)
=
\sum_{s',r} r\, P(s',r\mid s,a)
=
\sum_{s'} P(s'\mid s,a)\, R(s,a,s').


## Trajectory and environment dynamics

To model how an agent interacts with its environment over time, consider a sequential trajectory in a Markov Decision Process (MDP):

$$
S_t \xrightarrow{A_t} (S_{t+1}, R_{t+1}) \xrightarrow{A_{t+1}} (S_{t+2}, R_{t+2}) \xrightarrow{A_{t+2}} \dots

- **State $S_t = s$**: The agent starts at time step $t$ in state $s$.
- **Action $A_t = a$**: The probability of selecting action $A_t = a$ in state $S_t = s$ is $P(A_t = a \mid S_t = s)$, also called the policy and written as $\pi(a \mid s)$.
- **Transition \& Reward $(S_{t+1** = s', R_{t+1} = r)$}: Given state $S_t = s$ and action $A_t = a$, the environment transitions to next state $S_{t+1} = s'$ and gives reward $R_{t+1} = r$ with joint probability $P(s', r \mid s, a) = P(S_{t+1} = s', R_{t+1} = r \mid S_t = s, A_t = a)$. *Note: Due to environmental stochasticity, both state transitions and reward outcomes are probabilistic; even when transitioning from state $s$ to the exact same next state $s'$ via action $a$, the immediate reward $R_{t+1*$ can vary according to this distribution.}

### Return $G_t$

The total discounted return $G_t$ from step $t$ is the sum of all future rewards:

$$
G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots = R_{t+1} + \gamma G_{t+1}

$$

where $R_{t+1}$ is the immediate reward and $\gamma \in [0, 1]$ is the discount factor.

## State-value $V^\pi$

We want (B.1).

### Define the state-value function

$$
V^\pi(s)
=
\mathbb{E}_\pi[G_t\mid S_t=s]


### Substitute the recursive return

From (B.6), $G_t=R_{t+1}+\gamma G_{t+1}$. Therefore,

$$
V^\pi(s)
&=
\mathbb{E}_\pi[G_t\mid S_t=s] \\
&=
\mathbb{E}_\pi[R_{t+1}+\gamma G_{t+1}\mid S_t=s] \\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s]
+
\gamma\mathbb{E}_\pi[G_{t+1}\mid S_t=s]

$$

We derive the two terms separately.

### Immediate Reward

Expand over $A_t$ by (A.7). Each inner expectation is the definition (A.3), then LOTP (A.1) writes the joint $P(s',r\mid s,a)$:

$$
\mathbb{E}_\pi[R_{t+1}\mid S_t=s]
&=
\sum_a
\mathbb{E}[R_{t+1}\mid S_t=s,A_t=a]
\,
\pi(a\mid s)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_a\pi(a\mid s)
\sum_r r\,
P(R_{t+1}=r\mid S_t=s,A_t=a)
\quad\text{[A.3; conditional expectation]}
\\
&=
\sum_a\pi(a\mid s)
\sum_{s',r}
r\, P(s',r\mid s,a)
\quad\text{[A.1; LOTP]}.

$$
\boxed{
\mathbb{E}_\pi[R_{t+1}\mid S_t=s]
=
\sum_a\pi(a\mid s)
\sum_{s',r}
rP(s',r\mid s,a)
}


### Future Return

Expand over $A_t$, then over $S_{t+1}$, by (A.7). Markov (A.11) drops $(s,a)$ given $s'$; the inner expectation is $V^\pi(s')$ by (B.7). A last LOTP writes $P(s'\mid s,a)=\sum_r P(s',r\mid s,a)$:

$$
\mathbb{E}_\pi[G_{t+1}\mid S_t=s]
&=
\sum_a
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
\,
\pi(a\mid s)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_a\pi(a\mid s)
\sum_{s'}
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a,S_{t+1}=s']
\,
P(s'\mid s,a)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_a\pi(a\mid s)
\sum_{s'}
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1}=s']
\,
P(s'\mid s,a)
\quad\text{[A.11; Markov]}
\\
&=
\sum_a\pi(a\mid s)
\sum_{s'}
V^\pi(s')\, P(s'\mid s,a)
\quad\text{[(B.7)]}
\\
&=
\sum_a\pi(a\mid s)
\sum_{s',r}
P(s',r\mid s,a)\, V^\pi(s')
\quad\text{[A.1; LOTP]}.

$$
\boxed{
\mathbb{E}_\pi[G_{t+1}\mid S_t=s]
=
\sum_a
\pi(a\mid s)
\sum_{s',r}
P(s',r\mid s,a)V^\pi(s')
}


### Combine

Recall (B.8). Substitute (B.9) and (B.10):

$$
V^\pi(s)
&=
\sum_a\pi(a\mid s)
\sum_{s',r}
rP(s',r\mid s,a)
\\
&\qquad+
\gamma
\sum_a\pi(a\mid s)
\sum_{s',r}
P(s',r\mid s,a)V^\pi(s')

Factor the common terms:

$$
\boxed{
V^\pi(s)
=
\sum_a
\pi(a\mid s)
\sum_{s',r}
P(s',r\mid s,a)
[
r+\gamma V^\pi(s')
]
}

$$

This is the **Bellman Expectation Equation** (B.1).

### Compact one-step form

Start from (B.8):

$$
V^\pi(s)
=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s]
+
\gamma
\mathbb{E}_\pi[G_{t+1}\mid S_t=s].

For the future term, apply the tower property (A.9) with $X=G_{t+1}$, $Y=S_{t+1}$, and $Z=S_t$. The inner conditional expectation is a function of $(S_{t+1},S_t)$:

$$
\mathbb{E}_\pi[G_{t+1}\mid S_t]
=
\mathbb{E}_\pi\bigl[
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1},S_t]
\bigm|
S_t
\bigr]
\quad\text{[A.9]}.

Given $S_{t+1}$, the Markov property (A.11) drops $S_t$, and the inner expectation is $V^\pi(S_{t+1})$ by (B.7):

$$
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1},S_t]
&=
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1}]
\quad\text{[A.11; Markov]}
\\
&=
V^\pi(S_{t+1})
\quad\text{[(B.7)]}.

Therefore

$$
\mathbb{E}_\pi[G_{t+1}\mid S_t]
=
\mathbb{E}_\pi\bigl[V^\pi(S_{t+1})\mid S_t\bigr],

and evaluating at $S_t=s$,

$$
\mathbb{E}_\pi[G_{t+1}\mid S_t=s]
=
\mathbb{E}_\pi\bigl[V^\pi(S_{t+1})\mid S_t=s\bigr].

Substitute back into (B.8) and apply linearity (A.5):

$$
V^\pi(s)
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s]
+
\gamma
\mathbb{E}_\pi\bigl[V^\pi(S_{t+1})\mid S_t=s\bigr]
\\
&=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s\bigr]
\quad\text{[A.5; linearity]}.

$$
\boxed{
V^\pi(s)
=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s\bigr].
}


**Alternative derivation (discrete expansion).** The same identity for $\mathbb{E}_\pi[G_{t+1}\mid S_t=s]$ can be written by expanding over next-state values with (A.10), then applying Markov and (B.7):

$$
\mathbb{E}_\pi[G_{t+1}\mid S_t=s]
&=
\sum_{s'}
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,S_{t+1}=s']
\,
P_\pi(S_{t+1}=s'\mid S_t=s)
\quad\text{[A.10]}
\\
&=
\sum_{s'}
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1}=s']
\,
P_\pi(S_{t+1}=s'\mid S_t=s)
\quad\text{[A.11; Markov]}
\\
&=
\sum_{s'}
V^\pi(s')
\,
P_\pi(S_{t+1}=s'\mid S_t=s)
\quad\text{[(B.7)]}
\\
&=
\mathbb{E}_\pi\bigl[V^\pi(S_{t+1})\mid S_t=s\bigr].

Substituting into (B.8) and using linearity (A.5) recovers (B.11) as before.

### Policy-averaged form

**Why ``policy-averaged''.** The one-step quantities $R(s,a)$ and $P(s'\mid s,a)$ still depend on the chosen action. Averaging them with weights $\pi(a\mid s)$ produces state-only objects $R^\pi(s)$ and $P^\pi(s'\mid s)$---the reward and transition **averaged under the policy**. Equation (B.1) writes those averages out explicitly; the form below absorbs them into $R^\pi$ and $P^\pi$, which is what matrix policy evaluation uses.

Define $R^\pi(s)=\mathbb{E}_\pi[R_{t+1}\mid S_t=s]$: the expected immediate reward from $s$ when actions are chosen by $\pi$. Expand over $A_t$ by (A.7) and use (B.5):

$$
R^\pi(s)
&=
\sum_a
\mathbb{E}[R_{t+1}\mid S_t=s,A_t=a]
\,
\pi(a\mid s)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_a\pi(a\mid s)\, R(s,a)
\quad\text{[(B.5)]}.

$$
R^\pi(s)
=
\sum_a\pi(a\mid s)\, R(s,a).

$$

Define $P^\pi(s'\mid s)=P_\pi(S_{t+1}=s'\mid S_t=s)$: the probability of moving from $s$ to $s'$ under $\pi$. By (A.1),

$$
P^\pi(s'\mid s)
=
\sum_a\pi(a\mid s)\, P(s'\mid s,a).

Start from the compact form (B.11). Apply linearity (A.5), then write the two expectations with (B.12) and the definition of $P^\pi$:

$$
V^\pi(s)
&=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s\bigr]
\quad\text{[(B.11)]}
\\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s]
+
\gamma
\mathbb{E}_\pi\bigl[V^\pi(S_{t+1})\mid S_t=s\bigr]
\quad\text{[A.5; linearity]}
\\
&=
R^\pi(s)
+
\gamma
\sum_{s'}
V^\pi(s')\, P^\pi(s'\mid s)
\quad\text{[(B.12); definition of $P^\pi$]}.

$$
\boxed{
V^\pi(s)
=
R^\pi(s)
+
\gamma
\sum_{s'}
P^\pi(s'\mid s)\, V^\pi(s')
}

$$

## Action-value $Q^\pi$

We want (B.2). An intermediate step is (B.17).

### Define the action-value function

$$
Q^\pi(s,a)
=
\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a]

$$

### Relate $V^\pi(s)$ to $Q^\pi(s,a)$

Expand over $A_t$ by (A.7). The inner expectation is $Q^\pi(s,a)$ by (B.13):

$$
V^\pi(s)
&=
\mathbb{E}_\pi[G_t\mid S_t=s]
\quad\text{[(B.7)]}
\\
&=
\sum_a
\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a]
\,
\pi(a\mid s)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_a\pi(a\mid s)\, Q^\pi(s,a)
\quad\text{[(B.13)]}.

$$
\boxed{
V^\pi(s)
=
\sum_a \pi(a\mid s)\, Q^\pi(s,a)
}


### Substitute the recursive return

From (B.6), $G_t=R_{t+1}+\gamma G_{t+1}$. Therefore,

$$
Q^\pi(s,a)
&=
\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a] \\
&=
\mathbb{E}_\pi[R_{t+1}+\gamma G_{t+1}\mid S_t=s,A_t=a] \\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a].

We derive the two terms separately.

### Immediate Reward

The action is already fixed. Apply the definition (A.3), then LOTP (A.1) for the joint $P(s',r\mid s,a)$:

$$
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
&=
\sum_r r\,
P(R_{t+1}=r\mid S_t=s,A_t=a)
\quad\text{[A.3; conditional expectation]}
\\
&=
\sum_{s',r}
r\, P(s',r\mid s,a)
\quad\text{[A.1; LOTP]}.

$$
\boxed{
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
=
\sum_{s',r}
rP(s',r\mid s,a)
}

$$

### Future Return

Expand over $S_{t+1}$ by (A.7). Markov (A.11) drops $(s,a)$ given $s'$; the inner expectation is $V^\pi(s')$ by (B.7). A last LOTP writes $P(s'\mid s,a)=\sum_r P(s',r\mid s,a)$:

$$
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
&=
\sum_{s'}
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a,S_{t+1}=s']
\,
P(s'\mid s,a)
\quad\text{[A.7; partition expansion]}
\\
&=
\sum_{s'}
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1}=s']
\,
P(s'\mid s,a)
\quad\text{[A.11; Markov]}
\\
&=
\sum_{s'}
V^\pi(s')\, P(s'\mid s,a)
\quad\text{[(B.7)]}
\\
&=
\sum_{s',r}
P(s',r\mid s,a)\, V^\pi(s')
\quad\text{[A.1; LOTP]}.

$$
\boxed{
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
=
\sum_{s',r}
P(s',r\mid s,a)V^\pi(s')
}


### Combine

Substitute (B.15) and (B.16):

$$
Q^\pi(s,a)
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a] \\
&=
\sum_{s',r}
rP(s',r\mid s,a)
+
\gamma
\sum_{s',r}
P(s',r\mid s,a)V^\pi(s') \\
&=
\sum_{s',r}
P(s',r\mid s,a)
[
r+\gamma V^\pi(s')
].

$$
\boxed{
Q^\pi(s,a)
=
\sum_{s',r}
P(s',r\mid s,a)
[
r+\gamma V^\pi(s')
]
}


### Write $V^\pi(s')$ in terms of $Q^\pi$

Apply (B.14) at the next state $s'$:

$$
V^\pi(s')
=
\sum_{a'}
\pi(a'\mid s')\, Q^\pi(s',a')
\quad\text{[(B.14)]}.

Substitute into (B.17):

$$
\boxed{
Q^\pi(s,a)
=
\sum_{s',r}
P(s',r\mid s,a)
[
r+
\gamma
\sum_{a'}
\pi(a'\mid s')Q^\pi(s',a')
]
}


### Compact one-step form

The same $Q^\pi$ has a compact form parallel to (B.11). Start from the return recursion under (B.13), apply linearity (A.5), then the tower property (A.9), then Markov (A.11):

$$
Q^\pi(s,a)
&=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma G_{t+1}\mid S_t=s,A_t=a\bigr]
\quad\text{[(B.13); (B.6)]}
\\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
\quad\text{[A.5; linearity]}
\\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma
\mathbb{E}_\pi\bigl[
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1},A_{t+1},S_t,A_t]
\bigm|
S_t=s,A_t=a
\bigr]
\quad\text{[A.9]}
\\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma
\mathbb{E}_\pi\bigl[
\mathbb{E}_\pi[G_{t+1}\mid S_{t+1},A_{t+1}]
\bigm|
S_t=s,A_t=a
\bigr]
\quad\text{[A.11; Markov]}
\\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma
\mathbb{E}_\pi\bigl[Q^\pi(S_{t+1},A_{t+1})\mid S_t=s,A_t=a\bigr]
\quad\text{[(B.13)]}
\\
&=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma Q^\pi(S_{t+1},A_{t+1})\mid S_t=s,A_t=a\bigr]
\quad\text{[A.5; linearity]}.

$$
\boxed{
Q^\pi(s,a)
=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma Q^\pi(S_{t+1},A_{t+1})\mid S_t=s,A_t=a\bigr].
}

$$

Expanding the right-hand side over $P$ and $\pi$ recovers (B.2).

## Expectation relations between $V^\pi$ and $Q^\pi$

Sections B.3--B.4 expand the Bellman equations as sums over $\pi$ and $P$. Later chapters often need the same links written only with expectations. Recall the definitions (B.7) and (B.13):

$$
V^\pi(s)
=
\mathbb{E}_\pi[G_t\mid S_t=s],
\qquad
Q^\pi(s,a)
=
\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a].

### $V^\pi$ from $Q^\pi$

From (B.14), for a fixed state $s$,

$$
V^\pi(s)
=
\sum_a \pi(a\mid s)\, Q^\pi(s,a)
=
\mathbb{E}_{A\sim\pi(\cdot\mid s)}\bigl[Q^\pi(s,A)\bigr].

$$

### $Q^\pi$ from $V^\pi$

For a fixed pair $(s,a)$, start from the definition of $Q^\pi$ and the return recursion (B.6):

$$
Q^\pi(s,a)
&=
\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a]
\quad\text{[definition]}
\\
&=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma G_{t+1}\mid S_t=s,A_t=a\bigr]
\quad\text{[(B.6)]}
\\
&=
\mathbb{E}_\pi[R_{t+1}\mid S_t=s,A_t=a]
+
\gamma\,
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
\quad\text{[A.5]}.

For the future term, condition on $S_{t+1}$ and apply the tower property (A.9):

$$
&\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
\\
&\qquad=
\mathbb{E}_\pi\Bigl[
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a,S_{t+1}]
\Bigm|S_t=s,A_t=a
\Bigr]
\quad\text{[A.9]}.

By definition, $V^\pi(S_{t+1})=\mathbb{E}_\pi[G_{t+1}\mid S_{t+1}]$. Markov (A.11) applies to this future term: once $S_{t+1}$ is known, $V^\pi(S_{t+1})$ does not depend on the earlier $(S_t,A_t)$, so $$
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a,S_{t+1}]
=
V^\pi(S_{t+1}).
$$ Therefore $$
\mathbb{E}_\pi[G_{t+1}\mid S_t=s,A_t=a]
=
\mathbb{E}_\pi\bigl[V^\pi(S_{t+1})\mid S_t=s,A_t=a\bigr].

Markov does **not** let us drop the outer conditioning and write $\mathbb{E}_\pi[V^\pi(S_{t+1})]$. Markov applies when $S_{t+1}$ is already known: then $V^\pi(S_{t+1})$ ignores the past. Here $S_{t+1}$ is still random; it is the outcome of $(S_t,A_t)$ under $P$. So the average of $V^\pi(S_{t+1})$ must keep $|S_t=s,A_t=a$.

Substitute back and apply linearity (A.5):

$$
Q^\pi(s,a)
=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s,A_t=a\bigr].

$$

Expanding over $P$ recovers (B.17).

### One-step backups

The same pattern with only state-values or only action-values is (B.11) and (B.18):

$$
V^\pi(s)
=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s\bigr],
\qquad
Q^\pi(s,a)
=
\mathbb{E}_\pi\bigl[R_{t+1}+\gamma Q^\pi(S_{t+1},A_{t+1})\mid S_t=s,A_t=a\bigr].

